import { QuerySyntaxEnum, AnyButFunction } from '@chego/chego-api';
import { SQLSyntaxTemplate, SQLSyntaxTemplateData } from '@chego/chego-database-boilerplate';

const select: SQLSyntaxTemplate = () => (...columns: string[]) =>
    `SELECT ${columns.join(', ')}`

const insert: SQLSyntaxTemplate = () => (keys: string[], values: string[]) =>
    `(${keys.join(', ')}) VALUES ${values.join(', ')}`

const to: SQLSyntaxTemplate = () => (table: string) =>
    `INSERT INTO ${table}`

const update: SQLSyntaxTemplate = () => (table: string) =>
    `UPDATE ${table}`;

const set: SQLSyntaxTemplate = () => (properties: any) =>
    `SET ${properties}`;

const remove: SQLSyntaxTemplate = () => () => 'DELETE';

const from: SQLSyntaxTemplate = () => (table: string) =>
    `FROM ${table}`;

const eq: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => (value: number | string) =>
    `${data.property} ${data.negation ? '!=' : '='} ${value}`;

const gt: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => (value: number | string) =>
    `${data.property} ${data.negation ? '<=' : '>'} ${value}`;

const lt: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => (value: number | string) =>
    `${data.property} ${data.negation ? '>=' : '<'} ${value}`;

const isNull: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => () =>
    `${data.property} ${data.negation ? 'IS NOT NULL' : 'IS NULL'}`;
const between: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => (min: number, max: number) =>
    `${data.property} ${data.negation ? 'NOT BETWEEN' : 'BETWEEN'} ${min} AND ${max}`;
const where: SQLSyntaxTemplate = () => () => 'WHERE';
const having: SQLSyntaxTemplate = () => () => 'HAVING';
const and: SQLSyntaxTemplate = () => () => 'AND';
const or: SQLSyntaxTemplate = () => () => 'OR';
const openParentheses: SQLSyntaxTemplate = () => () => '(';
const closeParentheses: SQLSyntaxTemplate = () => () => ')';
const orderBy: SQLSyntaxTemplate = () => (...sorting: string[]) =>
    `ORDER BY ${sorting.join(', ')}`;
const groupBy: SQLSyntaxTemplate = () => (...sorting: string[]) =>
    `GROUP BY ${sorting.join(', ')}`;
const join: SQLSyntaxTemplate = () => (table: string) =>
    `INNER JOIN ${table}`;
const leftJoin: SQLSyntaxTemplate = () => (table: string) =>
    `LEFT JOIN ${table}`;
const rightJoin: SQLSyntaxTemplate = () => (table: string) =>
    `RIGHT JOIN ${table}`;
const fullJoin: SQLSyntaxTemplate = () => (table: string) =>
    `FULL JOIN ${table}`;
const on: SQLSyntaxTemplate = () => (keyA: string, keyB: string) =>
    `ON ${keyA} = ${keyB}`;
const using: SQLSyntaxTemplate = () => (key: string) =>
    `USING(${key})`;
const whereIn: SQLSyntaxTemplate = () => (...keys: string[]) =>
    `IN (${keys.join(',')})`;
const limit: SQLSyntaxTemplate = () => (a: number, b?: number) =>
    `LIMIT ${b ? String(`${a}, ${b}`) : a}`;
const like: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => (expression: string) =>
    `${data.property} ${data.negation ? 'NOT LIKE' : 'LIKE'} ${expression}`;
const union: SQLSyntaxTemplate = () => (query: string) =>
    `UNION ${query}`;
const unionAll: SQLSyntaxTemplate = () => (query: string) =>
    `UNION ALL ${query}`;
const exists: SQLSyntaxTemplate = (data: SQLSyntaxTemplateData) => (query: string) =>
    `${data.negation ? 'NOT EXISTS' : 'EXISTS'} ${query}`;
const coalesce: SQLSyntaxTemplate = () => (values: AnyButFunction[], alias?: string) =>
    `COALESCE(${values.join(', ')}) ${alias ? alias : ''}`;
const greatest: SQLSyntaxTemplate = () => (values: AnyButFunction[], alias?: string) =>
    `GREATEST(${values.join(', ')}) ${alias ? alias : ''}`;
const least: SQLSyntaxTemplate = () => (values: AnyButFunction[], alias?: string) =>
    `LEAST(${values.join(', ')}) ${alias ? alias : ''}`;
const min: SQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `MIN(${expression}) ${alias ? alias : ''}`;
const max: SQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `MAX(${expression}) ${alias ? alias : ''}`;
const sum: SQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `SUM(${expression}) ${alias ? alias : ''}`;
const avg: SQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `AVG(${expression}) ${alias ? alias : ''}`;
const sqrt: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `SQRT(${value}) ${alias ? alias : ''}`;
const pow: SQLSyntaxTemplate = () => (value: number, exponent: number, alias?: string) =>
    `POW(${value},${exponent}) ${alias ? alias : ''}`;
const count: SQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `COUNT(${expression}) ${alias ? alias : ''}`;
const ascii: SQLSyntaxTemplate = () => (expression: string, alias?: string) =>
    `ASCII(${expression}) ${alias ? alias : ''}`;
const asin: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `ASIN(${expression}) ${alias ? alias : ''}`;
const atan: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `ATAN(${expression}) ${alias ? alias : ''}`;
const atan2: SQLSyntaxTemplate = () => (a: string | number, b: string | number, alias?: string) =>
    `ATAN2(${a},${b}) ${alias ? alias : ''}`;
const ceil: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `CEIL(${expression}) ${alias ? alias : ''}`;
const cos: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `COS(${expression}) ${alias ? alias : ''}`;
const cot: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `COT(${expression}) ${alias ? alias : ''}`;
const degrees: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `DEGREES(${expression}) ${alias ? alias : ''}`;
const div: SQLSyntaxTemplate = () => (a: string | number, b: string | number, alias?: string) =>
    `${a} DIV ${b} ${alias ? 'AS ' + alias : ''}`;
const exp: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `EXP(${expression}) ${alias ? alias : ''}`;
const floor: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `FLOOR(${expression}) ${alias ? alias : ''}`;
const ln: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LN(${expression}) ${alias ? alias : ''}`;
const log: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LOG(${expression}) ${alias ? alias : ''}`;
const log2: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LOG2(${expression}) ${alias ? alias : ''}`;
const log10: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `LOG10(${expression}) ${alias ? alias : ''}`;
const mod: SQLSyntaxTemplate = () => (a: string | number, b: string | number, alias?: string) =>
    `MOD(${a},${b}) ${alias ? alias : ''}`;
const pi: SQLSyntaxTemplate = () => (alias?: string) =>
    `PI() ${alias ? alias : ''}`;
const radians: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `RADIANS(${expression}) ${alias ? alias : ''}`;
const rand: SQLSyntaxTemplate = () => (alias?: string) =>
    `RAND() ${alias ? alias : ''}`;
const round: SQLSyntaxTemplate = () => (value: string | number, decimals: string | number, alias?: string) =>
    `ROUND(${value},${decimals}) ${alias ? alias : ''}`;
const sign: SQLSyntaxTemplate = () => (expression: string | number, alias?: string) =>
    `SIGN(${expression}) ${alias ? alias : ''}`;
const sin: SQLSyntaxTemplate = () => (value: string | number, alias?: string) =>
    `SIN(${value}) ${alias ? alias : ''}`;
const tan: SQLSyntaxTemplate = () => (value: string | number, alias?: string) =>
    `TAN(${value}) ${alias ? alias : ''}`;
const truncate: SQLSyntaxTemplate = () => (value: string | number, decimals: string | number, alias?: string) =>
    `TRUNCATE(${value},${decimals}) ${alias ? alias : ''}`;
const bin: SQLSyntaxTemplate = () => (value: string | number, alias?: string) =>
    `BIN(${value}) ${alias ? alias : ''}`;
const binary: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `BINARY "${value}" ${alias ? alias : ''}`;
const castAsBinary: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS BINARY) ${alias ? alias : ''}`;
const castAsChar: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS CHAR) ${alias ? alias : ''}`;
const castAsDate: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS DATE) ${alias ? alias : ''}`;
const castAsDatetime: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS DATETIME) ${alias ? alias : ''}`;
const castAsTime: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS TIME) ${alias ? alias : ''}`;
const castAsSigned: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS SIGNED) ${alias ? alias : ''}`;
const castAsUnsigned: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `CAST(${value} AS UNSIGNED) ${alias ? alias : ''}`;
const charLength: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `CHAR_LENGTH(${value}) ${alias ? alias : ''}`;
const concat: SQLSyntaxTemplate = () => (values: string[], alias?: string) =>
    `CONCAT(${values.join(',')}) ${alias ? alias : ''}`;
const concatWs: SQLSyntaxTemplate = () => (separator: string, values: string[], alias?: string) =>
    `CONCAT_WS(${separator},${values.join(',')}) ${alias ? alias : ''}`;
const field: SQLSyntaxTemplate = () => (search: string, values: string[], alias?: string) =>
    `FIELD(${search},${values.join(',')}) ${alias ? alias : ''}`;
const findInSet: SQLSyntaxTemplate = () => (search: string, value: string, alias?: string) =>
    `FIND_IN_SET(${search},${value}) ${alias ? alias : ''}`;
const format: SQLSyntaxTemplate = () => (value: string | number, decimals: string | number, alias?: string) =>
    `FORMAT(${value},${decimals}) ${alias ? alias : ''}`;
const insertString: SQLSyntaxTemplate = () => (value: string, start: number, length: number, value2: string, alias?: string) =>
    `INSERT(${value},${start},${length},${value2}) ${alias ? alias : ''}`;
const instr: SQLSyntaxTemplate = () => (value: string, value2: string, alias?: string) =>
    `INSTR(${value},${value2}) ${alias ? alias : ''}`;
const lcase: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `LCASE(${value}) ${alias ? alias : ''}`;
const ucase: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `UCASE(${value}) ${alias ? alias : ''}`;
const lTrim: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `LTRIM(${value}) ${alias ? alias : ''}`;
const rTrim: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `RTRIM(${value}) ${alias ? alias : ''}`;
const trim: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `TRIM(${value}) ${alias ? alias : ''}`;
const left: SQLSyntaxTemplate = () => (value: string, length: number, alias?: string) =>
    `LEFT(${value},${length}) ${alias ? alias : ''}`;
const right: SQLSyntaxTemplate = () => (value: string, length: number, alias?: string) =>
    `RIGHT(${value},${length}) ${alias ? alias : ''}`;
const length: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `LENGTH(${value}) ${alias ? alias : ''}`;
const locate: SQLSyntaxTemplate = () => (search: string, value: string, start?: number, alias?: string) =>
    `LOCATE(${search},${value}${start ? ',' + start : ''}) ${alias ? alias : ''}`;
const position: SQLSyntaxTemplate = () => (value: string, value2: string, alias?: string) =>
    `POSITION(${value} IN ${value2}) ${alias ? alias : ''}`;
const repeat: SQLSyntaxTemplate = () => (value: string | number, decimals: number, alias?: string) =>
    `REPEAT(${value},${decimals}) ${alias ? alias : ''}`;
const replace: SQLSyntaxTemplate = () => (value: string, from: string, to: string, alias?: string) =>
    `REPALCE(${value},${from},${to}) ${alias ? alias : ''}`;
const reverse: SQLSyntaxTemplate = () => (value: string, alias?: string) =>
    `REVERSE(${value}) ${alias ? alias : ''}`;
const rPad: SQLSyntaxTemplate = () => (value: string, length: number, value2: string, alias?: string) =>
    `RPAD(${value},${length},${value2}) ${alias ? alias : ''}`;
const lPad: SQLSyntaxTemplate = () => (value: string, length: number, value2: string, alias?: string) =>
    `LPAD(${value},${length},${value2}) ${alias ? alias : ''}`;
const space: SQLSyntaxTemplate = () => (value: number, alias?: string) =>
    `SPACE(${value}) ${alias ? alias : ''}`;
const mid: SQLSyntaxTemplate = () => (value: string, start: number, length: number, alias?: string) =>
    `MID(${value},${start},${length}) ${alias ? alias : ''}`;
const strcmp: SQLSyntaxTemplate = () => (value: string, value2: string, alias?: string) =>
    `STRCMP(${value},${value2}) ${alias ? alias : ''}`;
const substr: SQLSyntaxTemplate = () => (value: string, start: number, length: number, alias?: string) =>
    `SUBSTR(${value},${start},${length}) ${alias ? alias : ''}`;
const substringIndex: SQLSyntaxTemplate = () => (value: string, delimiter: string, length: number, alias?: string) =>
    `SUBSTRING_INDEX(${value},${delimiter},${length}) ${alias ? alias : ''}`;

export const templates: Map<QuerySyntaxEnum, SQLSyntaxTemplate> = new Map<QuerySyntaxEnum, SQLSyntaxTemplate>([
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