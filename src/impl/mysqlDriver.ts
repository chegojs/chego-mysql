import * as mysql from 'mysql'
import { IDatabaseDriver, IQuery, IQueryScheme, IQuerySchemeArray } from '@chego/chego-api';

const parseScheme = (scheme: IQueryScheme): string => {
    const schemeArr:IQuerySchemeArray = scheme.toArray();
    return schemeArr.reduce((query:string, element:any) => {
        
        return query;
    }, '');
}

export const chegoMySQL = (): IDatabaseDriver => {
    let initialized: boolean = false;
    let pool: mysql.Pool;

    const driver = {
        initialize(config: any): IDatabaseDriver {
            pool = mysql.createPool(config);
            initialized = true;
            return driver;
        },
        execute: (query: IQuery): Promise<any> => new Promise((resolve, reject) => {
            if (!initialized) {
                return reject(new Error('Driver not initialized'));
            }
            pool.getConnection((connectionError: mysql.MysqlError, connection: mysql.PoolConnection) => {
                if (connectionError) { 
                    return reject(connectionError); 
                }
                const q: string = parseScheme(query.scheme);
                connection.query(q, (queryError: mysql.MysqlError, result: any) => {
                    connection.release();
                    return (queryError) ? reject(queryError) : resolve(result);
                });
            });
        });
    }
    return driver;
}
