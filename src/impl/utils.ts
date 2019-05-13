import { Property, Table } from "@chego/chego-api";
import * as mysql from 'mysql'

export const parsePropertyToString = (property: Property, useAlias?: boolean): string =>
    useAlias && property.alias
        ? property.alias
        : property.table
            ? `${property.table.name}.${property.name}`
            : property.name;

export const parseTableToString = (table: Table, useAlias?: boolean): string =>
    useAlias && table.alias
        ? table.alias
        : table.name;

export const parsePropertyToEquation = (properties:any) => (list:string[], key:string) => 
(list.push(`${key} = ${properties[key]}`), list);

export const escapeValue = (value:any):any => {
    if(typeof value === 'string') {
        return mysql.escape(value);
    }
    return value;
}