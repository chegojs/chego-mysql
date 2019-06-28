import { QuerySyntaxEnum, Fn, AnyButFunction, Atan2Param, DivParam, ModParam, ConcatWsParam, 
    FieldParam, FindInSetParam, InsertParam, InstrParam, PositionParam, RepeatParam, ReplaceParam, 
    PadParam, StrcmpParam, SubstrIndexParam, RoundParam, TruncateParam, FormatParam, LeftParam, RightParam, LocateParam, MidParam, SubstrParam } from '@chego/chego-api';

const coalesce: Fn<string> = (values: AnyButFunction[], alias?: string) =>
    `COALESCE(${values.join(', ')}) ${alias ? alias : ''}`;
const greatest: Fn<string> = (values: AnyButFunction[], alias?: string) =>
    `GREATEST(${values.join(', ')}) ${alias ? alias : ''}`;
const least: Fn<string> = (values: AnyButFunction[], alias?: string) =>
    `LEAST(${values.join(', ')}) ${alias ? alias : ''}`;
const min: Fn<string> = (expression: AnyButFunction, alias?: string) =>
    `MIN(${expression}) ${alias ? alias : ''}`;
const max: Fn<string> = (param: AnyButFunction, alias?: string) =>
    `MAX(${param}) ${alias ? alias : ''}`;
const sum: Fn<string> = (expression: AnyButFunction, alias?: string) =>
    `SUM(${expression}) ${alias ? alias : ''}`;
const avg: Fn<string> = (expression: AnyButFunction, alias?: string) =>
    `AVG(${expression}) ${alias ? alias : ''}`;
const sqrt: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `SQRT(${value}) ${alias ? alias : ''}`;
const pow: Fn<string> = (value: AnyButFunction, exponent: number, alias?: string) =>
    `POW(${value},${exponent}) ${alias ? alias : ''}`;
const count: Fn<string> = (expression: AnyButFunction, alias?: string) =>
    `COUNT(${expression}) ${alias ? alias : ''}`;
const ascii: Fn<string> = (expression: AnyButFunction, alias?: string) =>
    `ASCII(${expression}) ${alias ? alias : ''}`;
const asin: Fn<string> = (expression: string | number, alias?: string) =>
    `ASIN(${expression}) ${alias ? alias : ''}`;
const atan: Fn<string> = (expression: string | number, alias?: string) =>
    `ATAN(${expression}) ${alias ? alias : ''}`;
const atan2: Fn<string> = (params:Atan2Param, alias?: string) =>
    `ATAN2(${params.x},${params.y}) ${alias ? alias : ''}`;
const ceil: Fn<string> = (expression: string | number, alias?: string) =>
    `CEIL(${expression}) ${alias ? alias : ''}`;
const cos: Fn<string> = (expression: string | number, alias?: string) =>
    `COS(${expression}) ${alias ? alias : ''}`;
const cot: Fn<string> = (expression: string | number, alias?: string) =>
    `COT(${expression}) ${alias ? alias : ''}`;
const degrees: Fn<string> = (expression: string | number, alias?: string) =>
    `DEGREES(${expression}) ${alias ? alias : ''}`;
const div: Fn<string> = (params:DivParam, alias?: string) =>
    `${params.x} DIV ${params.y} ${alias ? 'AS ' + alias : ''}`;
const exp: Fn<string> = (expression: string | number, alias?: string) =>
    `EXP(${expression}) ${alias ? alias : ''}`;
const floor: Fn<string> = (expression: string | number, alias?: string) =>
    `FLOOR(${expression}) ${alias ? alias : ''}`;
const ln: Fn<string> = (expression: string | number, alias?: string) =>
    `LN(${expression}) ${alias ? alias : ''}`;
const log: Fn<string> = (expression: string | number, alias?: string) =>
    `LOG(${expression}) ${alias ? alias : ''}`;
const log2: Fn<string> = (expression: string | number, alias?: string) =>
    `LOG2(${expression}) ${alias ? alias : ''}`;
const log10: Fn<string> = (expression: string | number, alias?: string) =>
    `LOG10(${expression}) ${alias ? alias : ''}`;
const mod: Fn<string> = (params:ModParam, alias?: string) =>
    `MOD(${params.x},${params.y}) ${alias ? alias : ''}`;
const pi: Fn<string> = (param:number, alias?: string) =>
    `PI() ${alias ? alias : ''}`;
const radians: Fn<string> = (expression: string | number, alias?: string) =>
    `RADIANS(${expression}) ${alias ? alias : ''}`;
const rand: Fn<string> = (alias?: string) =>
    `RAND() ${alias ? alias : ''}`;
const round: Fn<string> = (params:RoundParam, alias?: string) =>
    `ROUND(${params.value},${params.decimal}) ${alias ? alias : ''}`;
const sign: Fn<string> = (expression: string | number, alias?: string) =>
    `SIGN(${expression}) ${alias ? alias : ''}`;
const sin: Fn<string> = (value: string | number, alias?: string) =>
    `SIN(${value}) ${alias ? alias : ''}`;
const tan: Fn<string> = (value: string | number, alias?: string) =>
    `TAN(${value}) ${alias ? alias : ''}`;
const truncate: Fn<string> = (params:TruncateParam, alias?: string) =>
    `TRUNCATE(${params.value},${params.decimal}) ${alias ? alias : ''}`;
const bin: Fn<string> = (value: string | number, alias?: string) =>
    `BIN(${value}) ${alias ? alias : ''}`;
const binary: Fn<string> = (value: number, alias?: string) =>
    `BINARY "${value}" ${alias ? alias : ''}`;
const castAsBinary: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS BINARY) ${alias ? alias : ''}`;
const castAsChar: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS CHAR) ${alias ? alias : ''}`;
const castAsDate: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS DATE) ${alias ? alias : ''}`;
const castAsDatetime: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS DATETIME) ${alias ? alias : ''}`;
const castAsTime: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS TIME) ${alias ? alias : ''}`;
const castAsSigned: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS SIGNED) ${alias ? alias : ''}`;
const castAsUnsigned: Fn<string> = (value: AnyButFunction, alias?: string) =>
    `CAST(${value} AS UNSIGNED) ${alias ? alias : ''}`;
const charLength: Fn<string> = (value: string, alias?: string) =>
    `CHAR_LENGTH(${value}) ${alias ? alias : ''}`;
const concat: Fn<string> = (values: string[], alias?: string) =>
    `CONCAT(${values.join(',')}) ${alias ? alias : ''}`;
const concatWs: Fn<string> = (params:ConcatWsParam, alias?: string) =>
    `CONCAT_WS(${params.separator},${params.values.join(',')}) ${alias ? alias : ''}`;
const field: Fn<string> = (params:FieldParam, alias?: string) =>
    `FIELD(${params.search},${params.values.join(',')}) ${alias ? alias : ''}`;
const findInSet: Fn<string> = (params:FindInSetParam, alias?: string) =>
    `FIND_IN_SET(${params.search},${params.set}) ${alias ? alias : ''}`;
const format: Fn<string> = (params:FormatParam , alias?: string) =>
    `FORMAT(${params.value},${params.decimal}) ${alias ? alias : ''}`;
const insertString: Fn<string> = (params:InsertParam, alias?: string) =>
    `INSERT(${params.value},${params.position},${params.length},${params.toInsert}) ${alias ? alias : ''}`;
const instr: Fn<string> = (params: InstrParam, alias?: string) =>
    `INSTR(${params.value},${params.search}) ${alias ? alias : ''}`;
const lcase: Fn<string> = (value: string, alias?: string) =>
    `LCASE(${value}) ${alias ? alias : ''}`;
const ucase: Fn<string> = (value: string, alias?: string) =>
    `UCASE(${value}) ${alias ? alias : ''}`;
const lTrim: Fn<string> = (value: string, alias?: string) =>
    `LTRIM(${value}) ${alias ? alias : ''}`;
const rTrim: Fn<string> = (value: string, alias?: string) =>
    `RTRIM(${value}) ${alias ? alias : ''}`;
const trim: Fn<string> = (value: string, alias?: string) =>
    `TRIM(${value}) ${alias ? alias : ''}`;
const left: Fn<string> = (params: LeftParam, alias?: string) =>
    `LEFT(${params.value},${params.charsCount}) ${alias ? alias : ''}`;
const right: Fn<string> = (params: RightParam, alias?: string) =>
    `RIGHT(${params.value},${params.charsCount}) ${alias ? alias : ''}`;
const length: Fn<string> = (value: string, alias?: string) =>
    `LENGTH(${value}) ${alias ? alias : ''}`;
const locate: Fn<string> = (params:LocateParam, alias?: string) =>
    `LOCATE(${params.search},${params.value}${params.start ? ',' + params.start : ''}) ${alias ? alias : ''}`;
const position: Fn<string> = (params: PositionParam, alias?: string) =>
    `POSITION(${params.substring} IN ${params.value}) ${alias ? alias : ''}`;
const repeat: Fn<string> = (params:RepeatParam, alias?: string) =>
    `REPEAT(${params.value},${params.count}) ${alias ? alias : ''}`;
const replace: Fn<string> = (params: ReplaceParam, alias?: string) =>
    `REPALCE(${params.value},${params.from},${params.to}) ${alias ? alias : ''}`;
const reverse: Fn<string> = (value: string, alias?: string) =>
    `REVERSE(${value}) ${alias ? alias : ''}`;
const rPad: Fn<string> = (params: PadParam, alias?: string) =>
    `RPAD(${params.value},${params.length},${params.value2}) ${alias ? alias : ''}`;
const lPad: Fn<string> = (params: PadParam, alias?: string) =>
    `LPAD(${params.value},${params.length},${params.value2}) ${alias ? alias : ''}`;
const space: Fn<string> = (value: number, alias?: string) =>
    `SPACE(${value}) ${alias ? alias : ''}`;
const mid: Fn<string> = (params: MidParam, alias?: string) =>
    `MID(${params.value},${params.start},${params.length}) ${alias ? alias : ''}`;
const strcmp: Fn<string> = (params: StrcmpParam, alias?: string) =>
    `STRCMP(${params.value},${params.value2}) ${alias ? alias : ''}`;
const substr: Fn<string> = (params: SubstrParam, alias?: string) =>
    `SUBSTR(${params.value},${params.start},${params.length}) ${alias ? alias : ''}`;
const substringIndex: Fn<string> = (params: SubstrIndexParam, alias?: string) =>
    `SUBSTRING_INDEX(${params.value},${params.delimiter},${params.count}) ${alias ? alias : ''}`;

export const functions: Map<QuerySyntaxEnum, Fn<string>> = new Map<QuerySyntaxEnum, Fn<string>>([
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