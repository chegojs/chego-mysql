import { QuerySyntaxEnum, AnyButFunction } from '@chego/chego-api';
import { UnionTypes } from '../api/enums';
import { MySQLSyntaxTemplate } from '../api/types';

const parsePropertyToEquation = (properties:any) => (list:string[], key:string) => 
    (list.push(`${key} = ${properties[key]}`), list);

const select:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (...columns:string[]) => `SELECT ${columns.join(', ')}`

const insert:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string, properties:object) => 
    `INSERT INTO ${table}(${Object.keys(properties).join(', ')}) VALUES(${Object.values(properties).join(', ')})`

const update:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string) => 
    `UPDATE ${table}`;

const set:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (properties:any) => 
    `SET ${properties}`;

const remove:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => 'DELETE';

const from:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string) => `FROM ${table}`;

const eq:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (value: number | string) => 
    `${property} ${negation ? '!=' : '='} ${value}`;

const gt:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (value: number | string) => 
    `${property} ${negation ? '<=' : '>'} ${value}`;
    
const lt:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (value: number | string) => 
    `${property} ${negation ? '>=' : '<'} ${value}`;
    
const isNull:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => `${property} ${negation ? 'IS NOT NULL' : 'IS NULL'}`;
const between:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (min: number, max: number) => `${property} ${ negation ? 'NOT BETWEEN' : 'BETWEEN'} ${min} AND ${max}`;
const where:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => 'WHERE';
const and:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => 'AND';
const or:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => 'OR';
const openParentheses:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => '(';
const closeParentheses:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => () => ')';
const orderBy:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (...sorting:string[]) => `ORDER BY ${sorting.join(', ')}`;
const groupBy:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (...sorting:string[]) => `GROUP BY ${sorting.join(', ')}`;
const join:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string) => `INNER JOIN ${table}`;
const leftJoin:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string) => `LEFT JOIN ${table}`;
const rightJoin:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string) => `RIGHT JOIN ${table}`;
const fullJoin:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (table:string) => `FULL JOIN ${table}`;
const on:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (keyA:string, keyB:string) => `ON ${keyA} = ${keyB}`;
const limit:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (a:number, b?:number) => `LIMIT ${b ? String(`${a}, ${b}`) : a}`;
const like:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (expression:string) => `${ negation ? 'NOT LIKE' : 'LIKE' } ${expression}`;
const union:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (type:UnionTypes) => `UNION ${type ? UnionTypes[type] : ''}`;
const exists:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (query:string) => `EXISTS(${query})`;
const coalesce:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (values:AnyButFunction[], alias?:string) => 
    `COALESCE(${values.join(', ')}) ${alias ? alias : ''}`;
const greatest:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (values:AnyButFunction[], alias?:string) => 
    `GREATEST(${values.join(', ')}) ${alias ? alias : ''}`;
const least:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (values:AnyButFunction[], alias?:string) => 
    `LEAST(${values.join(', ')}) ${alias ? alias : ''}`;

const min:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (expression:string, alias?:string) => `MIN(${expression}) ${alias ? alias : ''}`;
const max:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (expression:string, alias?:string) => `MAX(${expression}) ${alias ? alias : ''}`;
const sum:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (expression:string, alias?:string) => `SUM(${expression}) ${alias ? alias : ''}`;
const avg:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (expression:string, alias?:string) => `AVG(${expression}) ${alias ? alias : ''}`;
const sqrt:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (value:number, alias?:string) => `SQRT(${value}) ${alias ? alias : ''}`;
const pow:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (value:number, exponent:number, alias?:string) => `POW(${value},${exponent}) ${alias ? alias : ''}`;
const count:MySQLSyntaxTemplate  = (negation:boolean) => (property:string) => (expression:string, alias?:string) => `COUNT(${expression}) ${alias ? alias : ''}`;

export const templates:Map<QuerySyntaxEnum, MySQLSyntaxTemplate> = new Map<QuerySyntaxEnum, MySQLSyntaxTemplate>([
    [QuerySyntaxEnum.Select, select],
    [QuerySyntaxEnum.Update, update],
    [QuerySyntaxEnum.Set, set],
    [QuerySyntaxEnum.EQ, eq],
    [QuerySyntaxEnum.Null, isNull],
    [QuerySyntaxEnum.GT, gt],
    [QuerySyntaxEnum.LT, lt],
    [QuerySyntaxEnum.And, and],
    [QuerySyntaxEnum.Or, or],
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
    [QuerySyntaxEnum.Where, where],
    [QuerySyntaxEnum.On, on],
]);