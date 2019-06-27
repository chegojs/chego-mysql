import * as mysql from 'mysql'
import { IDatabaseDriver, IQuery, IQueryResult, Fn } from '@chego/chego-api';
import { newQueryResult, parseSchemeToSQL, newSqlExecutor, SQLQuery, } from '@chego/chego-database-boilerplate'
import { templates } from './templates';

const newTransactionHandle = (connection: mysql.Connection) => (queries: IQuery[]) => {
    const queryCallback = (error: Error, result: any) => {
        if (error) {
            connection.rollback();
        } else {
            result.setData(result);
        }
    }
    return new Promise((resolve, reject) => {
        connection.beginTransaction(async (error: Error) => {
            const result: IQueryResult = newQueryResult();
            if (error) {
                return reject(error);
            }
            for (const query of queries) {
                const sql: SQLQuery = parseSchemeToSQL(query.scheme, templates);
                await connection.query(sql.body, queryCallback);
            }
            connection.commit((error: Error) => error
                ? (connection.rollback(), reject(error))
                : resolve(result.getData())
            );
        });
    });
}

const newQueryHandle = (connection: mysql.Connection) => (query: IQuery) =>
    new Promise((resolve, reject) => {
        const sql: SQLQuery = parseSchemeToSQL(query.scheme, templates);
        connection.query(sql.body, (error: Error, result: any) =>
            (error) ? reject(error) : resolve(result));
    });

export const chegoMySQL = (): IDatabaseDriver => {
    let initialized: boolean = false;
    let connection: mysql.Connection;

    const driver = {
        initialize(config: any): IDatabaseDriver {
            connection = mysql.createConnection(config);
            initialized = true;
            return driver;
        },
        execute: async (queries: IQuery[]): Promise<any> => new Promise((resolve, reject) => {
            if (!initialized) {
                throw new Error('Driver not initialized');
            }
            
            const queryHandle: Fn<Promise<any>> = newQueryHandle(connection);
            const transactionHandle: Fn<Promise<any>> = newTransactionHandle(connection);

            return newSqlExecutor()
                .withQueryHandle(queryHandle)
                .withTransactionsHandle(transactionHandle)
                .execute(queries)
                .then(resolve)
                .catch(reject);
        }),
        connect: (): Promise<any> => new Promise((resolve) => {
            connection.connect();
            resolve();
        }),
        disconnect: (): Promise<any> => new Promise((resolve) => {
            connection.end();
            resolve();
        })
    }
    return driver;
}