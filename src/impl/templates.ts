
import { QuerySyntaxEnum, AnyButFunction } from '@chego/chego-api';
import { MySQLSyntaxTemplate } from '../api/MySQLTypes';

const parsePropertyToEquation = (properties:any) => (list:string[], key:string, ) => 
    (list.push(`${key} = ${properties[key]}`), list);

const select: MySQLSyntaxTemplate = (...keys:string[]) => `SELECT ${keys.join(',')}`

const insert: MySQLSyntaxTemplate = (table:string, properties:object) => 
    `INSERT INTO ${table}(${Object.keys(properties).join(',')}) VALUES(${Object.values(properties).join(',')})`

const update: MySQLSyntaxTemplate = (table:string, properties:any) => 
    `UPDATE ${table} SET ${Object.keys(properties).reduce(parsePropertyToEquation(properties), []).join(',')}`;

const remove: MySQLSyntaxTemplate = () => 'DELETE';

const from:MySQLSyntaxTemplate = (table:string) => `FROM ${table}`;

const eq:MySQLSyntaxTemplate = (key:string, value: number | string, negation?:boolean) => 
    `${key} ${negation ? '!=' : '='} ${value}`;

const isNull:MySQLSyntaxTemplate = () => 'IS NULL';

const gt: MySQLSyntaxTemplate = (key:string, value: number | string, negation?:boolean) => 
    `${key} ${negation ? '<=' : '>'} ${value}`;

const lt: MySQLSyntaxTemplate = (key:string, value: number | string, negation?:boolean) => 
    `${key} ${negation ? '>=' : '<'} ${value}`;

const between: MySQLSyntaxTemplate = (min: number, max: number) => `BETWEEN ${min} AND ${max}`;
const and:MySQLSyntaxTemplate = () => 'AND';
const or:MySQLSyntaxTemplate = () => 'OR';
const not:MySQLSyntaxTemplate = () => 'NOT';
const openParentheses:MySQLSyntaxTemplate = () => '(';
const closeParentheses:MySQLSyntaxTemplate = () => ')';
const orderBy:MySQLSyntaxTemplate = (...sorting:string[]) => `ORDER BY(${sorting.join(',')})`;
const groupBy:MySQLSyntaxTemplate = (...sorting:string[]) => `GROUP BY(${sorting.join(',')})`;
const join:MySQLSyntaxTemplate = (table:string, keyA:string, keyB:string) => `INNER JOIN ${table} ON ${keyA} = ${keyB}`;
const leftJoin:MySQLSyntaxTemplate = (table:string, keyA:string, keyB:string) => `LEFT JOIN ${table} ON ${keyA} = ${keyB}`;
const rightJoin:MySQLSyntaxTemplate = (table:string, keyA:string, keyB:string) => `RIGHT JOIN ${table} ON ${keyA} = ${keyB}`;
const fullJoin:MySQLSyntaxTemplate = (table:string, keyA:string, keyB:string) => `FULL JOIN ${table} ON ${keyA} = ${keyB}`;
const limit:MySQLSyntaxTemplate = (a:number, b?:number) => `LIMIT ${b ? String(`${a},${b}`) : a}`;
const like:MySQLSyntaxTemplate = (a:number) => `LIKE ${a}`;
const union:MySQLSyntaxTemplate = (type:string) => `UNION ${type ? type : ''}`;
const exists:MySQLSyntaxTemplate = (query:string) => `EXISTS(${query})`;
const coalesce:MySQLSyntaxTemplate = (values:AnyButFunction[], alias?:string) => 
    `COALESCE(${values.join(',')}) ${alias ? alias : ''}`;
const greatest:MySQLSyntaxTemplate = (values:AnyButFunction[], alias?:string) => 
    `GREATEST(${values.join(',')}) ${alias ? alias : ''}`;
const least:MySQLSyntaxTemplate = (values:AnyButFunction[], alias?:string) => 
    `LEAST(${values.join(',')}) ${alias ? alias : ''}`;

const min:MySQLSyntaxTemplate = (expression:string, alias?:string) => `MIN(${expression}) ${alias ? alias : ''}`;
const max:MySQLSyntaxTemplate = (expression:string, alias?:string) => `MAX(${expression}) ${alias ? alias : ''}`;
const sum:MySQLSyntaxTemplate = (expression:string, alias?:string) => `SUM(${expression}) ${alias ? alias : ''}`;
const avg:MySQLSyntaxTemplate = (expression:string, alias?:string) => `AVG(${expression}) ${alias ? alias : ''}`;
const sqrt:MySQLSyntaxTemplate = (value:number, alias?:string) => `SQRT(${value}) ${alias ? alias : ''}`;
const pow:MySQLSyntaxTemplate = (value:number, exponent:number, alias?:string) => `POW(${value},${exponent}) ${alias ? alias : ''}`;
const count:MySQLSyntaxTemplate = (expression:string, alias?:string) => `COUNT(${expression}) ${alias ? alias : ''}`;


export const templates:Map<QuerySyntaxEnum, MySQLSyntaxTemplate> = new Map<QuerySyntaxEnum, MySQLSyntaxTemplate>([
    [QuerySyntaxEnum.Select, select],
    [QuerySyntaxEnum.EQ, eq],
    [QuerySyntaxEnum.Null, isNull],
    [QuerySyntaxEnum.GT, gt],
    [QuerySyntaxEnum.LT, lt],
    [QuerySyntaxEnum.And, and],
    [QuerySyntaxEnum.Or, or],
    [QuerySyntaxEnum.Not, not],
    [QuerySyntaxEnum.OpenParentheses, openParentheses],
    [QuerySyntaxEnum.CloseParentheses, closeParentheses],
    [QuerySyntaxEnum.Between, between],
    [QuerySyntaxEnum.Count, count],
    [QuerySyntaxEnum.Pow, pow],
    [QuerySyntaxEnum.Sqrt, sqrt],
    [QuerySyntaxEnum.Avg, avg],
    [QuerySyntaxEnum.Sum, sum],
    [QuerySyntaxEnum.Max, max],
    [QuerySyntaxEnum.Min, min],
    [QuerySyntaxEnum.Least, least],
    [QuerySyntaxEnum.Greatest, greatest],
    [QuerySyntaxEnum.Coalesce, coalesce],
    [QuerySyntaxEnum.Exists, exists],
    [QuerySyntaxEnum.Union, union],
    [QuerySyntaxEnum.Like, like],
    [QuerySyntaxEnum.Limit, limit],
    [QuerySyntaxEnum.FullJoin, fullJoin],
    [QuerySyntaxEnum.LeftJoin, leftJoin],
    [QuerySyntaxEnum.RightJoin, rightJoin],
    [QuerySyntaxEnum.Join, join],
    [QuerySyntaxEnum.GroupBy, groupBy],
    [QuerySyntaxEnum.OrderBy, orderBy],
    [QuerySyntaxEnum.From, from],
    [QuerySyntaxEnum.Delete, remove],
    [QuerySyntaxEnum.Insert, insert],
]);