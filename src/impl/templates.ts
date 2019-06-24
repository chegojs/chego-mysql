import { QuerySyntaxEnum, AnyButFunction } from '@chego/chego-api';
import { MySQLSyntaxTemplate, MySQLSyntaxTemplateData } from '../api/types';

const select: MySQLSyntaxTemplate = () => (...columns: string[]) =>
    `SELECT ${columns.join(', ')}`

const insert: MySQLSyntaxTemplate = () => (keys: string[], values: string[]) =>
    `(${keys.join(', ')}) VALUES ${values.join(', ')}`

const to: MySQLSyntaxTemplate = () => (table: string) =>
    `INSERT INTO ${table}`

const update: MySQLSyntaxTemplate = () => (table: string) =>
    `UPDATE ${table}`;

const set: MySQLSyntaxTemplate = () => (properties: any) =>
    `SET ${properties}`;

const remove: MySQLSyntaxTemplate = () => () => 'DELETE';

const from: MySQLSyntaxTemplate = () => (table: string) =>
    `FROM ${table}`;

const eq: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => (value: number | string) =>
    `${data.property} ${data.negation ? '!=' : '='} ${value}`;

const gt: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => (value: number | string) =>
    `${data.property} ${data.negation ? '<=' : '>'} ${value}`;

const lt: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => (value: number | string) =>
    `${data.property} ${data.negation ? '>=' : '<'} ${value}`;

const isNull: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => () =>
    `${data.property} ${data.negation ? 'IS NOT NULL' : 'IS NULL'}`;
const between: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => (min: number, max: number) =>
    `${data.property} ${data.negation ? 'NOT BETWEEN' : 'BETWEEN'} ${min} AND ${max}`;
const where: MySQLSyntaxTemplate = () => () => 'WHERE';
const having: MySQLSyntaxTemplate = () => () => 'HAVING';
const and: MySQLSyntaxTemplate = () => () => 'AND';
const or: MySQLSyntaxTemplate = () => () => 'OR';
const openParentheses: MySQLSyntaxTemplate = () => () => '(';
const closeParentheses: MySQLSyntaxTemplate = () => () => ')';
const orderBy: MySQLSyntaxTemplate = () => (...sorting: string[]) =>
    `ORDER BY ${sorting.join(', ')}`;
const groupBy: MySQLSyntaxTemplate = () => (...sorting: string[]) =>
    `GROUP BY ${sorting.join(', ')}`;
const join: MySQLSyntaxTemplate = () => (table: string) =>
    `INNER JOIN ${table}`;
const leftJoin: MySQLSyntaxTemplate = () => (table: string) =>
    `LEFT JOIN ${table}`;
const rightJoin: MySQLSyntaxTemplate = () => (table: string) =>
    `RIGHT JOIN ${table}`;
const fullJoin: MySQLSyntaxTemplate = () => (table: string) =>
    `FULL JOIN ${table}`;
const on: MySQLSyntaxTemplate = () => (keyA: string, keyB: string) =>
    `ON ${keyA} = ${keyB}`;
const using: MySQLSyntaxTemplate = () => (key: string) =>
    `USING(${key})`;
const whereIn: MySQLSyntaxTemplate = () => (...keys: string[]) =>
    `IN (${keys.join(',')})`;
const limit: MySQLSyntaxTemplate = () => (a: number, b?: number) =>
    `LIMIT ${b ? String(`${a}, ${b}`) : a}`;
const like: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => (expression: string) =>
    `${data.property} ${data.negation ? 'NOT LIKE' : 'LIKE'} ${expression}`;
const union: MySQLSyntaxTemplate = () => (query: string) =>
    `UNION ${query}`;
const unionAll: MySQLSyntaxTemplate = () => (query: string) =>
    `UNION ALL ${query}`;
const exists: MySQLSyntaxTemplate = (data: MySQLSyntaxTemplateData) => (query: string) =>
    `${data.negation ? 'NOT EXISTS' : 'EXISTS'} ${query}`;
const coalesce: MySQLSyntaxTemplate = () => (values: AnyButFunction[], alias?: string) =>
    `COALESCE(${values.join(', ')}) ${alias ? alias : ''}`;
const greatest: MySQLSyntaxTemplate = () => (values: AnyButFunction[], alias?: string) =>
    `GREATEST(${values.join(', ')}) ${alias ? alias : ''}`;
const least: MySQLSyntaxTemplate = () => (values: AnyButFunction[], alias?: string) =>
    `LEAST(${values.join(', ')}) ${alias ? alias : ''}`;
const min: MySQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `MIN(${expression}) ${alias ? alias : ''}`;
const max: MySQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `MAX(${expression}) ${alias ? alias : ''}`;
const sum: MySQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `SUM(${expression}) ${alias ? alias : ''}`;
const avg: MySQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `AVG(${expression}) ${alias ? alias : ''}`;
const sqrt: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `SQRT(${value}) ${alias ? alias : ''}`;
const pow: MySQLSyntaxTemplate = () => (value: number, exponent: number, alias?: string) =>
    `POW(${value},${exponent}) ${alias ? alias : ''}`;
const count: MySQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `COUNT(${expression}) ${alias ? alias : ''}`;
const ascii: MySQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `ASCII(${expression}) ${alias ? alias : ''}`;
const asin: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `ASIN(${expression}) ${alias ? alias : ''}`;
const atan: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `ATAN(${expression}) ${alias ? alias : ''}`;
const atan2: MySQLSyntaxTemplate = () => (a: string | number, b: string | number, alias?: string) =>
    `ATAN2(${a},${b}) ${alias ? alias : ''}`;
const ceil: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `CEIL(${expression}) ${alias ? alias : ''}`;
const cos: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `COS(${expression}) ${alias ? alias : ''}`;
const cot: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `COT(${expression}) ${alias ? alias : ''}`;
const degrees: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `DEGREES(${expression}) ${alias ? alias : ''}`;
const div: MySQLSyntaxTemplate = () => (a: string | number, b: string | number, alias?: string) =>
    `${a} DIV ${b} ${alias ? 'AS ' + alias : ''}`;
const exp: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `EXP(${expression}) ${alias ? alias : ''}`;
const floor: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `FLOOR(${expression}) ${alias ? alias : ''}`;
const ln: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LN(${expression}) ${alias ? alias : ''}`;
const log: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LOG(${expression}) ${alias ? alias : ''}`;
const log2: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LOG2(${expression}) ${alias ? alias : ''}`;
const log10: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LOG10(${expression}) ${alias ? alias : ''}`;
const mod: MySQLSyntaxTemplate = () => (a: string | number, b: string | number, alias?: string) =>
    `MOD(${a},${b}) ${alias ? alias : ''}`;
const pi: MySQLSyntaxTemplate = () => (alias?: string) =>
    `PI() ${alias ? alias : ''}`;
const radians: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `RADIANS(${expression}) ${alias ? alias : ''}`;
const rand: MySQLSyntaxTemplate = () => (alias?: string) =>
    `RAND() ${alias ? alias : ''}`;
const round: MySQLSyntaxTemplate = () => (value: string | number, decimals: string | number, alias?: string) =>
    `ROUND(${value},${decimals}) ${alias ? alias : ''}`;
const sign: MySQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `SIGN(${expression}) ${alias ? alias : ''}`;
const sin: MySQLSyntaxTemplate = () => (value: string | number, alias?: string) =>
    `SIN(${value}) ${alias ? alias : ''}`;
const tan: MySQLSyntaxTemplate = () => (value: string | number, alias?: string) =>
    `TAN(${value}) ${alias ? alias : ''}`;
const truncate: MySQLSyntaxTemplate = () => (value: string | number, decimals: string | number, alias?: string) =>
    `TRUNCATE(${value},${decimals}) ${alias ? alias : ''}`;
const bin: MySQLSyntaxTemplate = () => (value: string | number, alias?: string) =>
    `BIN(${value}) ${alias ? alias : ''}`;
const binary: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `BINARY "${value}" ${alias ? alias : ''}`;
const castAsBinary: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS BINARY) ${alias ? alias : ''}`;
const castAsChar: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS CHAR) ${alias ? alias : ''}`;
const castAsDate: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS DATE) ${alias ? alias : ''}`;
const castAsDatetime: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS DATETIME) ${alias ? alias : ''}`;
const castAsTime: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS TIME) ${alias ? alias : ''}`;
const castAsSigned: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS SIGNED) ${alias ? alias : ''}`;
const castAsUnsigned: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS UNSIGNED) ${alias ? alias : ''}`;
const charLength: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `CHAR_LENGTH(${value}) ${alias ? alias : ''}`;
const concat: MySQLSyntaxTemplate = () => (values: string[], alias?: string) =>
    `CONCAT(${values.join(',')}) ${alias ? alias : ''}`;
const concatWs: MySQLSyntaxTemplate = () => (separator: string, values: string[], alias?: string) =>
    `CONCAT_WS(${separator},${values.join(',')}) ${alias ? alias : ''}`;
const field: MySQLSyntaxTemplate = () => (search: string, values: string[], alias?: string) =>
    `FIELD(${search},${values.join(',')}) ${alias ? alias : ''}`;
const findInSet: MySQLSyntaxTemplate = () => (search: string, value: string, alias?: string) =>
    `FIND_IN_SET(${search},${value}) ${alias ? alias : ''}`;
const format: MySQLSyntaxTemplate = () => (value: string | number, decimals: string | number, alias?: string) =>
    `FORMAT(${value},${decimals}) ${alias ? alias : ''}`;
const insertString: MySQLSyntaxTemplate = () => (value: string, start: number, length: number, value2: string, alias?: string) =>
    `INSERT(${value},${start},${length},${value2}) ${alias ? alias : ''}`;
const instr: MySQLSyntaxTemplate = () => (value: string, value2: string, alias?: string) =>
    `INSTR(${value},${value2}) ${alias ? alias : ''}`;
const lcase: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `LCASE(${value}) ${alias ? alias : ''}`;
const ucase: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `UCASE(${value}) ${alias ? alias : ''}`;
const lTrim: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `LTRIM(${value}) ${alias ? alias : ''}`;
const rTrim: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `RTRIM(${value}) ${alias ? alias : ''}`;
const trim: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `TRIM(${value}) ${alias ? alias : ''}`;
const left: MySQLSyntaxTemplate = () => (value: string, length: number, alias?: string) =>
    `LEFT(${value},${length}) ${alias ? alias : ''}`;
const right: MySQLSyntaxTemplate = () => (value: string, length: number, alias?: string) =>
    `RIGHT(${value},${length}) ${alias ? alias : ''}`;
const length: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `LENGTH(${value}) ${alias ? alias : ''}`;
const locate: MySQLSyntaxTemplate = () => (search: string, value: string, start?: number, alias?: string) =>
    `LOCATE(${search},${value}${start ? ',' + start : ''}) ${alias ? alias : ''}`;
const position: MySQLSyntaxTemplate = () => (value: string, value2: string, alias?: string) =>
    `POSITION(${value} IN ${value2}) ${alias ? alias : ''}`;
const repeat: MySQLSyntaxTemplate = () => (value: string | number, decimals: number, alias?: string) =>
    `REPEAT(${value},${decimals}) ${alias ? alias : ''}`;
const replace: MySQLSyntaxTemplate = () => (value: string, from: string, to: string, alias?: string) =>
    `REPALCE(${value},${from},${to}) ${alias ? alias : ''}`;
const reverse: MySQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `REVERSE(${value}) ${alias ? alias : ''}`;
const rPad: MySQLSyntaxTemplate = () => (value: string, length: number, value2: string, alias?: string) =>
    `RPAD(${value},${length},${value2}) ${alias ? alias : ''}`;
const lPad: MySQLSyntaxTemplate = () => (value: string, length: number, value2: string, alias?: string) =>
    `LPAD(${value},${length},${value2}) ${alias ? alias : ''}`;
const space: MySQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `SPACE(${value}) ${alias ? alias : ''}`;
const mid: MySQLSyntaxTemplate = () => (value: string, start: number, length: number, alias?: string) =>
    `MID(${value},${start},${length}) ${alias ? alias : ''}`;
const strcmp: MySQLSyntaxTemplate = () => (value: string, value2: string, alias?: string) =>
    `STRCMP(${value},${value2}) ${alias ? alias : ''}`;
const substr: MySQLSyntaxTemplate = () => (value: string, start: number, length: number, alias?: string) =>
    `SUBSTR(${value},${start},${length}) ${alias ? alias : ''}`;
const substringIndex: MySQLSyntaxTemplate = () => (value: string, delimiter: string, length: number, alias?: string) =>
    `SUBSTRING_INDEX(${value},${delimiter},${length}) ${alias ? alias : ''}`;

export const templates: Map<QuerySyntaxEnum, MySQLSyntaxTemplate> = new Map<QuerySyntaxEnum, MySQLSyntaxTemplate>([
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
    [QuerySyntaxEnum.Ascii, ascii],
    [QuerySyntaxEnum.Asin, asin],
    [QuerySyntaxEnum.Atan, atan],
    [QuerySyntaxEnum.Atan2, atan2],
    [QuerySyntaxEnum.Bin, bin],
    [QuerySyntaxEnum.Binary, binary],
    [QuerySyntaxEnum.CastAsBinary, castAsBinary],
    [QuerySyntaxEnum.CastAsChar, castAsChar],
    [QuerySyntaxEnum.CastAsDate, castAsDate],
    [QuerySyntaxEnum.CastAsDatetime, castAsDatetime],
    [QuerySyntaxEnum.CastAsTime, castAsTime],
    [QuerySyntaxEnum.CastAsSigned, castAsSigned],
    [QuerySyntaxEnum.CastAsUnsigned, castAsUnsigned],
    [QuerySyntaxEnum.Ceil, ceil],
    [QuerySyntaxEnum.CharLength, charLength],
    [QuerySyntaxEnum.Concat, concat],
    [QuerySyntaxEnum.ConcatWs, concatWs],
    [QuerySyntaxEnum.Cos, cos],
    [QuerySyntaxEnum.Cot, cot],
    [QuerySyntaxEnum.Degrees, degrees],
    [QuerySyntaxEnum.Div, div],
    [QuerySyntaxEnum.Exp, exp],
    [QuerySyntaxEnum.Field, field],
    [QuerySyntaxEnum.FindInSet, findInSet],
    [QuerySyntaxEnum.Floor, floor],
    [QuerySyntaxEnum.Format, format],
    [QuerySyntaxEnum.InsertString, insertString],
    [QuerySyntaxEnum.Instr, instr],
    [QuerySyntaxEnum.Lcase, lcase],
    [QuerySyntaxEnum.Left, left],
    [QuerySyntaxEnum.Length, length],
    [QuerySyntaxEnum.Ln, ln],
    [QuerySyntaxEnum.Locate, locate],
    [QuerySyntaxEnum.Log, log],
    [QuerySyntaxEnum.Log10, log10],
    [QuerySyntaxEnum.Log2, log2],
    [QuerySyntaxEnum.Lpad, lPad],
    [QuerySyntaxEnum.Ltrim, lTrim],
    [QuerySyntaxEnum.Mid, mid],
    [QuerySyntaxEnum.Mod, mod],
    [QuerySyntaxEnum.Pi, pi],
    [QuerySyntaxEnum.Position, position],
    [QuerySyntaxEnum.Radians, radians],
    [QuerySyntaxEnum.Rand, rand],
    [QuerySyntaxEnum.Repeat, repeat],
    [QuerySyntaxEnum.ReplaceString, replace],
    [QuerySyntaxEnum.Reverse, reverse],
    [QuerySyntaxEnum.Right, right],
    [QuerySyntaxEnum.Round, round],
    [QuerySyntaxEnum.Rpad, rPad],
    [QuerySyntaxEnum.Rtrim, rTrim],
    [QuerySyntaxEnum.Sign, sign],
    [QuerySyntaxEnum.Sin, sin],
    [QuerySyntaxEnum.Space, space],
    [QuerySyntaxEnum.Strcmp, strcmp],
    [QuerySyntaxEnum.Substr, substr],
    [QuerySyntaxEnum.SubstringIndex, substringIndex],
    [QuerySyntaxEnum.Tan, tan],
    [QuerySyntaxEnum.Trim, trim],
    [QuerySyntaxEnum.Truncate, truncate],
    [QuerySyntaxEnum.Ucase, ucase]
]);