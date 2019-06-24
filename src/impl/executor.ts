import { AnyButFunction, IQueryResult } from '@chego/chego-api';
import * as mysql from 'mysql'
import { IQueryScheme, IQuerySchemeArray, IQuery, IQuerySchemeElement } from '@chego/chego-api';
import { isQueryScheme } from '@chego/chego-tools';
import { newQueryBuilder } from './queryBuilder';
import { IQueryBuilder } from '../api/interfaces';

const parseSchemeToQueryString = (scheme: IQueryScheme): string => {
    const schemeArr: IQuerySchemeArray = scheme.toArray();
    const queryBuilder: IQueryBuilder = newQueryBuilder();

    schemeArr.forEach((element: IQuerySchemeElement) => {
        queryBuilder.with(element.type,
            isQueryScheme(element.params[0])
                ? [`(${parseSchemeToQueryString(element.params[0])})`]
                : element.params);
    });
    return queryBuilder.build();
}

const queryResult = (): IQueryResult => {
    let result: AnyButFunction;
    return {
        setData: (value: AnyButFunction): void => {
            result = value;
        },
        getData: (): AnyButFunction => result
    }
}

const beginTransaction = (connection: mysql.Connection, queries: IQuery[]) =>
    new Promise((resolve, reject) => {
        connection.beginTransaction(async (error: mysql.MysqlError) => {
            const result: IQueryResult = queryResult();
            if (error) {
                return reject(error);
            }
            for (const query of queries) {
                await executeQuery(connection, query, verifyTransaction).then(result.setData).catch(reject);
            }
            connection.commit((error: mysql.MysqlError) => error
                ? (connection.rollback(), reject(error))
                : resolve(result.getData())
            );
        });
    });

const verifyTransaction = (connection: mysql.Connection, error: mysql.MysqlError, result: any): Promise<any> =>
    error ? (connection.rollback(), Promise.reject(error)) : Promise.resolve(result);

const verifySingleQuery = (connection: mysql.Connection, error: mysql.MysqlError, result: any): Promise<any> =>
    error ? Promise.reject(error) : Promise.resolve(result);

const executeQuery = (connection: mysql.Connection, query: IQuery, callback: (...args: any[]) => Promise<any>) =>
    new Promise((resolve, reject) => {
        const sql: string = parseSchemeToQueryString(query.scheme);
        connection.query(sql, (error: mysql.MysqlError, result: any) =>
            callback(connection, error, result).then(resolve).catch(reject));
    });


export const execute = (connection: mysql.Connection, queries: IQuery[]) => new Promise((resolve, reject) =>
    ((queries.length > 1)
        ? beginTransaction(connection, queries)
        : executeQuery(connection, queries[0], verifySingleQuery))
        .then(resolve)
        .catch(reject));