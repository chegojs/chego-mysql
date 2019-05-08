import * as mysql from 'mysql'

import { IQueryScheme, IQuerySchemeArray, IDatabaseDriver, IQuery, IQuerySchemeElement, QuerySyntaxEnum } from '@chego/chego-api';
import { isQueryScheme } from '@chego/chego-tools';
import { newQueryBuilder } from './queryBuilder';

const parseScheme = (scheme: IQueryScheme): string => {
    const schemeArr: IQuerySchemeArray = scheme.toArray();
    const queryBuilder:any = newQueryBuilder();

    schemeArr.forEach((element:IQuerySchemeElement) => {
        if (isQueryScheme(element.params[0])) {
            // queryBuilder.withInnerQuery(`(${parseScheme(element.params[0])})`);
        } else {
            console.log('>>>>>>', QuerySyntaxEnum[element.type], element.params);
            queryBuilder.withElement(element);
        }
    });

    return queryBuilder.build();
}

export const chegoMySQL = (): IDatabaseDriver => {
    // let initialized: boolean = false;
    // let pool: mysql.Pool;

    const driver = {
        initialize(config: any): IDatabaseDriver {
            // pool = mysql.createPool(config);
            // initialized = true;
            return driver;
        },
        execute: (query: IQuery): Promise<any> => new Promise((resolve, reject) => {
            // if (!initialized) {
            //     return reject(new Error('Driver not initialized'));
            // }
            // pool.getConnection((connectionError: mysql.MysqlError, connection: mysql.PoolConnection) => {
            //     if (connectionError) {
            //         return reject(connectionError);
            //     }
            //     const q: string = parseScheme(query.scheme);
            //     connection.query(q, (queryError: mysql.MysqlError, result: any) => {
            //         connection.release();
            //         return (queryError) ? reject(queryError) : resolve(result);
            //     });
            // });
            console.log('!!!!', parseScheme(query.scheme))
            resolve(true);
        })
    }
    return driver;
}
