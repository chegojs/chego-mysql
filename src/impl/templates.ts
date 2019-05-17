import { QuerySyntaxEnum, AnyButFunction } from '@chego/chego-api';
import { MySQLSyntaxTemplate, MySQLSyntaxTemplateData } from '../api/types';

const select:MySQLSyntaxTemplate = () => (...columns:string[]) => `SELECT ${columns.join(', ')}`

const insert:MySQLSyntaxTemplate = () => (keys:string[], values:string[]) => `(${keys.join(', ')}) VALUES ${values.join(', ')}`

const to:MySQLSyntaxTemplate = () => (table:string) => `INSERT INTO ${table}`

const update:MySQLSyntaxTemplate = () => (table:string) => `UPDATE ${table}`;

const set:MySQLSyntaxTemplate = () => (properties:any) => `SET ${properties}`;

const remove:MySQLSyntaxTemplate = () => () => 'DELETE';

const from:MySQLSyntaxTemplate = () => (table:string) => `FROM ${table}`;

const eq:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => (value: number | string) => 
    `${data.property} ${data.negation ? '!=' : '='} ${value}`;

const gt:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => (value: number | string) => 
    `${data.property} ${data.negation ? '<=' : '>'} ${value}`;
    
const lt:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => (value: number | string) => 
    `${data.property} ${data.negation ? '>=' : '<'} ${value}`;
    
const isNull:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => () => `${data.property} ${data.negation ? 'IS NOT NULL' : 'IS NULL'}`;
const between:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => (min: number, max: number) => `${data.property} ${ data.negation ? 'NOT BETWEEN' : 'BETWEEN'} ${min} AND ${max}`;
const where:MySQLSyntaxTemplate = () => () => 'WHERE';
const having:MySQLSyntaxTemplate = () => () => 'HAVING';
const and:MySQLSyntaxTemplate = () => () => 'AND';
const or:MySQLSyntaxTemplate = () => () => 'OR';
const openParentheses:MySQLSyntaxTemplate = () => () => '(';
const closeParentheses:MySQLSyntaxTemplate = () => () => ')';
const orderBy:MySQLSyntaxTemplate = () => (...sorting:string[]) => `ORDER BY ${sorting.join(', ')}`;
const groupBy:MySQLSyntaxTemplate = () => (...sorting:string[]) => `GROUP BY ${sorting.join(', ')}`;
const join:MySQLSyntaxTemplate = () => (table:string) => `INNER JOIN ${table}`;
const leftJoin:MySQLSyntaxTemplate = () => (table:string) => `LEFT JOIN ${table}`;
const rightJoin:MySQLSyntaxTemplate = () => (table:string) => `RIGHT JOIN ${table}`;
const fullJoin:MySQLSyntaxTemplate = () => (table:string) => `FULL JOIN ${table}`;
const on:MySQLSyntaxTemplate = () => (keyA:string, keyB:string) => `ON ${keyA} = ${keyB}`;
const using:MySQLSyntaxTemplate = () => (key:string) => `USING(${key})`;
const whereIn:MySQLSyntaxTemplate = () => (...keys:string[]) => `IN (${keys.join(',')})`;
const limit:MySQLSyntaxTemplate = () => (a:number, b?:number) => `LIMIT ${b ? String(`${a}, ${b}`) : a}`;
const like:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => (expression:string) => `${data.property} ${ data.negation ? 'NOT LIKE' : 'LIKE' } ${expression}`;
const union:MySQLSyntaxTemplate = () => (query:string) => `UNION ${query}`;
const unionAll:MySQLSyntaxTemplate = () => (query:string) => `UNION ALL ${query}`;
const exists:MySQLSyntaxTemplate = (data:MySQLSyntaxTemplateData) => (query:string) => `${ data.negation ? 'NOT EXISTS' : 'EXISTS'} ${query}`;
const coalesce:MySQLSyntaxTemplate = () => (values:AnyButFunction[], alias?:string) => 
    `COALESCE(${values.join(', ')}) ${alias ? alias : ''}`;
const greatest:MySQLSyntaxTemplate = () => (values:AnyButFunction[], alias?:string) => 
    `GREATEST(${values.join(', ')}) ${alias ? alias : ''}`;
const least:MySQLSyntaxTemplate = () => (values:AnyButFunction[], alias?:string) => 
    `LEAST(${values.join(', ')}) ${alias ? alias : ''}`;

const min:MySQLSyntaxTemplate = () => (expression:string, alias?:string) => `MIN(${expression}) ${alias ? alias : ''}`;
const max:MySQLSyntaxTemplate = () => (expression:string, alias?:string) => `MAX(${expression}) ${alias ? alias : ''}`;
const sum:MySQLSyntaxTemplate = () => (expression:string, alias?:string) => `SUM(${expression}) ${alias ? alias : ''}`;
const avg:MySQLSyntaxTemplate = () => (expression:string, alias?:string) => `AVG(${expression}) ${alias ? alias : ''}`;
const sqrt:MySQLSyntaxTemplate = () => (value:number, alias?:string) => `SQRT(${value}) ${alias ? alias : ''}`;
const pow:MySQLSyntaxTemplate = () => (value:number, exponent:number, alias?:string) => `POW(${value},${exponent}) ${alias ? alias : ''}`;
const count:MySQLSyntaxTemplate = () => (expression:string, alias?:string) => `COUNT(${expression}) ${alias ? alias : ''}`;

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
    [QuerySyntaxEnum.UnionAll, unionAll],
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
    [QuerySyntaxEnum.To, to],
    [QuerySyntaxEnum.Where, where],
    [QuerySyntaxEnum.On, on],
    [QuerySyntaxEnum.Using, using],
    [QuerySyntaxEnum.Exists, exists],
    [QuerySyntaxEnum.Having, having],
    [QuerySyntaxEnum.In, whereIn],
]);