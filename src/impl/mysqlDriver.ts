import * as mysql from 'mysql'

import { IQueryScheme, IQuerySchemeArray, IDatabaseDriver, IQuery, IQuerySchemeElement, Obj } from '@chego/chego-api';
import { isQueryScheme } from '@chego/chego-tools';
import { newQueryBuilder } from './queryBuilder';
import { IQueryBuilder } from '../api/interfaces';

const parseScheme = (scheme: IQueryScheme): string => {
    const schemeArr: IQuerySchemeArray = scheme.toArray();
    const queryBuilder:IQueryBuilder = newQueryBuilder();

    schemeArr.forEach((element:IQuerySchemeElement) => {
        queryBuilder.with(element.type, 
            isQueryScheme(element.params[0]) 
                ? [`(${parseScheme(element.params[0])})`] 
                : element.params);
    });
    return queryBuilder.build();
}

export const chegoMySQL = (): IDatabaseDriver => {
    let initialized: boolean = false;
    let driverConfig:Obj;

    const driver = {
        initialize(config: any): IDatabaseDriver {
            driverConfig = config;
            initialized = true;
            return driver;
        },
        execute: (query: IQuery): Promise<any> => new Promise((resolve, reject) => {
            if (!initialized) {
                return reject(new Error('Driver not initialized'));
            }
            const connection = mysql.createConnection(driverConfig);
            connection.query(parseScheme(query.scheme), (error: mysql.MysqlError, result: any) => {
                connection.end();
                return (error) ? reject(error) : resolve(result);
            });
        })
    }
    return driver;
}
