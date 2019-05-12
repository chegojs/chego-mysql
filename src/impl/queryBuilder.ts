import { IQueryBuilder } from './../api/interfaces';
import { MySQLSyntaxTemplate, LogicalOperatorHandleData, QueryBuilderHandle, UseTemplateData } from './../api/types';
import { templates } from "./templates";
import { QuerySyntaxEnum, PropertyOrLogicalOperatorScope, Property, Fn, Obj, Table } from "@chego/chego-api";
import { parsePropertyToString, parseTableToString, adjustValue } from './utils';
import { mergePropertiesWithLogicalAnd, isLogicalOperatorScope, newLogicalOperatorScope } from '@chego/chego-tools';

export const newQueryBuilder = (): IQueryBuilder => {
    let keychain: PropertyOrLogicalOperatorScope[] = [];
    const query: string[] = [];
    const history: QuerySyntaxEnum[] = [];

    const handleSelect = (type:QuerySyntaxEnum, params:any[]): void => {
        const template: MySQLSyntaxTemplate = templates.get(QuerySyntaxEnum.Select);
        if (template) {
            const selection: string = (params.length === 0)
                ? '*'
                : params.reduce((result: string[], current: Property) => {
                    const key = parsePropertyToString(current);
                    result.push(current.alias ? `${key} AS ${current.alias}` : key)
                    return result;
                }, []).join(', ');

            query.push(template()(selection));
        }
    }

    const handleFrom = (type:QuerySyntaxEnum, params:any[]): void => {
        const template: MySQLSyntaxTemplate = templates.get(QuerySyntaxEnum.From);
        if (template) {
            const tables: string = params.reduce((result: string[], current: Property) => {
                const key = parseTableToString(current);
                result.push(current.alias ? `${key} ${current.alias}` : key)
                return result;
            }, []).join(', ');

            query.push(template()(tables));
        }
    }

    const handleWhere = (type:QuerySyntaxEnum, params:any[]): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        const penultimateType: QuerySyntaxEnum = history[history.length - 2];
        const values: PropertyOrLogicalOperatorScope[] = params.reduce(mergePropertiesWithLogicalAnd, []);

        if (
            (previousType === QuerySyntaxEnum.And || previousType === QuerySyntaxEnum.Or)
            && penultimateType === QuerySyntaxEnum.Where
        ) {
            const lastKey: PropertyOrLogicalOperatorScope = keychain[keychain.length - 1];
            if (!isLogicalOperatorScope(lastKey)) {
                throw new Error(`Key ${lastKey} should be LogialOperatorScope type!`)
            }
            lastKey.properties.push(...values);
        } else {
            if (keychain.length === 0 && templates.has(QuerySyntaxEnum.Where)) {
                query.push(templates.get(QuerySyntaxEnum.Where)()());
            }
            keychain = [...values];
        }
    }

    const addMissingKey = (list: string[]) => (key: string) => {
        if (list.indexOf(key) === -1) {
            list.push(key);
        }
    }

    const getUnifiedKeysList = (objects: Obj[]): string[] =>
        objects.reduce((keys: string[], item: Obj) =>
            (Object.keys(item).forEach(addMissingKey(keys)), keys), []);

    const addEmptyProperty = (item: Obj) => (key: string) => {
        if (!item.hasOwnProperty(key)) {
            item[key] = null;
        }
    }

    const addEmptyMissingProperties = (keys: string[]) =>
        (items: Obj[], item: Obj): Obj[] => (keys.forEach(addEmptyProperty(item)), [...items, item]);

    const prepareInsertValuesList = (result: any[], item: any): any[] => {
        const values: any[] = Object.values(item).reduce(adjustValues, <any>[]);
        result.push(`(${values.join(', ')})`)
        return result;
    }

    const handleInsert = (type:QuerySyntaxEnum, params:any[]): void => {
        const keys: string[] = getUnifiedKeysList(params);
        const items: Obj[] = params.reduce(addEmptyMissingProperties(keys), []);
        const values: string[] = items.reduce(prepareInsertValuesList, []);
        if (templates.has(type)) {
            query.push(templates.get(type)()(keys, values));
        }
    }

    const parseTablesToStrings = (list: string[], table: Table) => (list.push(parseTableToString(table)), list);

    const handleTo = (type:QuerySyntaxEnum, params:any[]): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        if (previousType === QuerySyntaxEnum.Insert) {
            const tables: string[] = params.reduce(parseTablesToStrings, []);
            if (templates.has(type)) {
                query.splice(-1, 0, templates.get(type)()(tables));
            }
        }
    }

    const handleUpdate = (type:QuerySyntaxEnum, params:any[]): void => {
        const tables: string[] = params.reduce(parseTablesToStrings, []);
        if (templates.has(type)) {
            query.push(templates.get(type)()(tables));
        }
    }

    const prepareSetValues = (properties: Obj) => (list: string[], key: string): string[] =>
        (list.push(`${key} = ${adjustValue(properties[key])}`), list);

    const handleSet = (type:QuerySyntaxEnum, params:any[]): void => {
        const properties: Obj = params[0];
        if (properties) {
            const values: string[] = Object.keys(properties).reduce(prepareSetValues(properties), []);
            if (templates.has(type)) {
                query.push(templates.get(type)()([values]));
            }
        }
    }

    const handleLogicalOperator = (type:QuerySyntaxEnum, params:any[]): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        if (previousType === QuerySyntaxEnum.Where) {
            keychain.push(newLogicalOperatorScope(type));
        } else {
            if (templates.has(type)) {
                query.push(templates.get(type)()());
            }
        }
    }

    const handleLogicalOperatorScope = (data: LogicalOperatorHandleData): string[] => {
        const conditionHandle: Fn = isMultiValuedCondition(data.condition, data.values) ? handleMultiValuedCondition : handleSingleValuedCondition;
        return (templates.has(data.operator))
            ? [templates.get(data.operator)()(), ...data.properties.reduce(conditionHandle(data.condition, data.negation, data.values), [])]
            : [];
    }

    const useTemplate = ({ type, negation, property, values }: UseTemplateData): string[] => {
        const key: string = property ? parsePropertyToString(property, true) : null;
        return (templates.has(type))
            ? [templates.get(type)({negation, property:key})(...values)]
            : [];
    }

    const handleMultiValuedCondition = (type: QuerySyntaxEnum, negation: boolean, values: any[]) =>
        (result: string[], key: PropertyOrLogicalOperatorScope): string[] => {
            if (isLogicalOperatorScope(key)) {
                result.push(...handleLogicalOperatorScope({ operator: key.type, condition: type, negation, properties: key.properties, values }));
            } else {
                values.forEach((value: any) => {
                    if (isLogicalOperatorScope(value)) {
                        result.push(...handleLogicalOperatorScope({ operator: value.type, condition: type, negation, properties: [key], values: value.properties }));
                    } else {
                        result.push(...useTemplate({ type, negation, property: key, values: [adjustValue(value)] }));
                    }
                });
            }
            return result;
        }

    const adjustValues = (list: any[], value: any) => (list.push(adjustValue(value)), list);

    const handleSingleValuedCondition = (type: QuerySyntaxEnum, negation: boolean, values: any[]) =>
        (parts: string[], key: PropertyOrLogicalOperatorScope): string[] => {
            if (isLogicalOperatorScope(key)) {
                parts.push(...handleLogicalOperatorScope({ operator: key.type, condition: type, negation, properties: key.properties, values }));
            } else {
                const parsedValues: any[] = values.reduce(adjustValues, [])
                parts.push(...useTemplate({ type, negation, property: key, values: parsedValues }));
            }
            return parts;
        }

    const isMultiValuedCondition = (type: QuerySyntaxEnum, values: any[]): boolean =>
        values.length > 1
        && (
            type === QuerySyntaxEnum.EQ
            || type === QuerySyntaxEnum.GT
            || type === QuerySyntaxEnum.LT
            || type === QuerySyntaxEnum.Like);

    const handleCondition = (type:QuerySyntaxEnum, params:any[]): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        const isNegation: boolean = previousType === QuerySyntaxEnum.Not;

        if (isMultiValuedCondition(type, params)) {
            const values: PropertyOrLogicalOperatorScope[] = params.reduce(mergePropertiesWithLogicalAnd, []);
            query.push(keychain.reduce(handleMultiValuedCondition(type, isNegation, values), []).join(' '));
        } else {
            query.push(keychain.reduce(handleSingleValuedCondition(type, isNegation, params), []).join(' '));
        }
    }

    const defaultHandle = (type:QuerySyntaxEnum, params:any[]) => {
        query.push(...useTemplate({ type, values: params }));
    }

    const handles = new Map<QuerySyntaxEnum, QueryBuilderHandle>([
        [QuerySyntaxEnum.From, handleFrom],
        [QuerySyntaxEnum.Select, handleSelect],
        [QuerySyntaxEnum.Where, handleWhere],
        [QuerySyntaxEnum.EQ, handleCondition],
        [QuerySyntaxEnum.LT, handleCondition],
        [QuerySyntaxEnum.GT, handleCondition],
        [QuerySyntaxEnum.Like, handleCondition],
        [QuerySyntaxEnum.Null, handleCondition],
        [QuerySyntaxEnum.Between, handleCondition],
        [QuerySyntaxEnum.And, handleLogicalOperator],
        [QuerySyntaxEnum.Or, handleLogicalOperator],
        [QuerySyntaxEnum.OpenParentheses, defaultHandle],
        [QuerySyntaxEnum.CloseParentheses, defaultHandle],
        [QuerySyntaxEnum.Delete, defaultHandle],
        [QuerySyntaxEnum.Insert, handleInsert],
        [QuerySyntaxEnum.Update, handleUpdate],
        [QuerySyntaxEnum.To, handleTo],
        [QuerySyntaxEnum.Set, handleSet],
        [QuerySyntaxEnum.Exists, defaultHandle],
        [QuerySyntaxEnum.Union, defaultHandle],
        [QuerySyntaxEnum.OrderBy, defaultHandle],
        [QuerySyntaxEnum.GroupBy, defaultHandle],
        [QuerySyntaxEnum.FullJoin, defaultHandle],
        [QuerySyntaxEnum.LeftJoin, defaultHandle],
        [QuerySyntaxEnum.RightJoin, defaultHandle],
        [QuerySyntaxEnum.Join, defaultHandle],
        [QuerySyntaxEnum.On, defaultHandle],
        [QuerySyntaxEnum.Limit, defaultHandle],
    ]);

    const builder:IQueryBuilder = {
        with: (type:QuerySyntaxEnum,params:any[]): void => {
            const handle = handles.get(type);
            if (handle) {
                handle(type, params);
            }
            history.push(type);
        },
        build: (): string => query.join(' ')
    }
    return builder;
}