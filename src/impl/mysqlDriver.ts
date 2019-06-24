import * as mysql from 'mysql'
import { IDatabaseDriver, IQuery } from '@chego/chego-api';
import { execute } from './executor';

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
            return execute(connection, queries).then(resolve).catch(reject);
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