import { IQueryBuilder } from './../api/interfaces';
import { MySQLSyntaxTemplate, LogicalOperatorHandleData, QueryBuilderHandle, UseTemplateData } from './../api/types';
import { templates } from "./templates";
import { QuerySyntaxEnum, PropertyOrLogicalOperatorScope, IQuerySchemeElement, Property, Fn, Obj, Table } from "@chego/chego-api";
import { parsePropertyToString, parseTableToString } from './utils';
import { mergePropertiesWithLogicalAnd, isLogicalOperator, isLogicalOperatorScope, newLogicalOperatorScope } from '@chego/chego-tools';

export const newQueryBuilder = (): IQueryBuilder => {
    let keychain: PropertyOrLogicalOperatorScope[] = [];
    const query: string[] = [];
    const history: QuerySyntaxEnum[] = [];

    const handleSelect = (element: IQuerySchemeElement): void => {
        const template: MySQLSyntaxTemplate = templates.get(QuerySyntaxEnum.Select);
        if (template) {
            const selection: string = (element.params.length === 0)
                ? '*'
                : element.params.reduce((result: string[], current: Property) => {
                    const key = parsePropertyToString(current);
                    result.push(current.alias ? `${key} AS ${current.alias}` : key)
                    return result;
                }, []).join(', ');

            query.push(template()()(selection));
        }
    }

    const handleFrom = (element: IQuerySchemeElement): void => {
        const template: MySQLSyntaxTemplate = templates.get(QuerySyntaxEnum.From);
        if (template) {
            const tables: string = element.params.reduce((result: string[], current: Property) => {
                const key = parseTableToString(current);
                result.push(current.alias ? `${key} ${current.alias}` : key)
                return result;
            }, []).join(', ');

            query.push(template()()(tables));
        }
    }

    const handleWhere = (element: IQuerySchemeElement): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        const penultimateType: QuerySyntaxEnum = history[history.length - 2];
        const params: PropertyOrLogicalOperatorScope[] = element.params.reduce(mergePropertiesWithLogicalAnd, []);

        if (isLogicalOperator(previousType) && penultimateType === QuerySyntaxEnum.Where) {
            const lastKey: PropertyOrLogicalOperatorScope = keychain[keychain.length - 1];
            if (!isLogicalOperatorScope(lastKey)) {
                throw new Error(`Key ${lastKey} should be LogialOperatorScope type!`)
            }
            lastKey.properties.push(...params);
        } else {
            if (keychain.length === 0 && templates.has(QuerySyntaxEnum.Where)) {
                query.push(templates.get(QuerySyntaxEnum.Where)()()());
            }
            keychain = [...params];
        }
    }
    
    const addMissingKey = (list:string[]) => (key: string) => {
        if (list.indexOf(key) === -1) {
            list.push(key);
        }
    }
    
    const getUnifiedKeysList = (objects: Obj[]): string[] =>
        objects.reduce((keys: string[], item: Obj) =>
            (Object.keys(item).forEach(addMissingKey(keys)), keys), []);
    
    const addEmptyProperty = (item:Obj) => (key: string) => {
        if (!item.hasOwnProperty(key)) {
            item[key] = null;
        }
    }
    
    const addEmptyMissingProperties = (keys: string[]) =>
        (items: Obj[], item: Obj):Obj[] => (keys.forEach(addEmptyProperty(item)), [...items, item]);

    const prepareInsertValuesList = (values: string[], item: Obj):string[] => 
        (values.push(`(${Object.values(item).join(', ')})`), values);

    const handleInsert = (element: IQuerySchemeElement): void => {
        const keys:string[] = getUnifiedKeysList(element.params);
        const items:Obj[] = element.params.reduce(addEmptyMissingProperties(keys),[]);
        const values:string[] = items.reduce(prepareInsertValuesList,[]);
        if (templates.has(element.type)) {
            query.push(templates.get(element.type)()()(keys,values));
        }
    }

    const parseTablesToStrings = (list:string[], table:Table) => (list.push(parseTableToString(table)),list);

    const handleTo = (element: IQuerySchemeElement): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        if(previousType === QuerySyntaxEnum.Insert) {
            const tables: string[] = element.params.reduce(parseTablesToStrings,[]);
            if (templates.has(element.type)) {
                query.splice(-1,0,templates.get(element.type)()()(tables));
            }
        }
    }

    const handleLogicalOperator = (element: IQuerySchemeElement): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        if (previousType === QuerySyntaxEnum.Where) {
            keychain.push(newLogicalOperatorScope(element.type));
        } else {
            if (templates.has(element.type)) {
                query.push(templates.get(element.type)()()());
            }
        }
    }

    const handleLogicalOperatorScope = (data: LogicalOperatorHandleData): string[] => {
        const conditionHandle: Fn = isMultiValuedCondition(data.condition, data.values) ? handleMultiValuedCondition : handleSingleValuedCondition;
        return (templates.has(data.operator))
            ? [templates.get(data.operator)()()(), ...conditionHandle(data.condition, data.negation, data.properties, data.values)]
            : [];
    }

    const useTemplate = ({type, negation, property, values}:UseTemplateData): string[] => {
        const key: string = property ? parsePropertyToString(property, true) : null;
        return (templates.has(type))
            ? [templates.get(type)(negation)(key)(...values)]
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
                        result.push(...useTemplate({type, negation, property:key, values:[value]}));
                    }
                });
            }
            return result;
        }

    const handleSingleValuedCondition = (type: QuerySyntaxEnum, negation: boolean, values: any[]) =>
        (parts: string[], key: PropertyOrLogicalOperatorScope): string[] => {
            if (isLogicalOperatorScope(key)) {
                parts.push(...handleLogicalOperatorScope({ operator: key.type, condition: type, negation, properties: key.properties, values }));
            } else {
                parts.push(...useTemplate({type, negation, property:key, values}));
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

    const handleCondition = (element: IQuerySchemeElement): void => {
        const previousType: QuerySyntaxEnum = history[history.length - 1];
        const isNegation: boolean = previousType === QuerySyntaxEnum.Not;

        if(isMultiValuedCondition(element.type, element.params)) {
            const values: PropertyOrLogicalOperatorScope[] = element.params.reduce(mergePropertiesWithLogicalAnd, []);
            query.push(keychain.reduce(handleMultiValuedCondition(element.type, isNegation, values), []).join(' '));
        } else {
            query.push(keychain.reduce(handleSingleValuedCondition(element.type, isNegation, element.params), []).join(' '));
        }
    }

    const defaultHandle = (element: IQuerySchemeElement) => {
        query.push(...useTemplate({type:element.type, values:element.params}));
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
        [QuerySyntaxEnum.Update, defaultHandle],
        [QuerySyntaxEnum.To, handleTo],
        [QuerySyntaxEnum.Set, defaultHandle],
        // [QuerySyntaxEnum.Exists,],
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

    const builder = {
        withInnerQuery: (innerQUery:string) => {
            query.push(`( ${innerQUery} )`)
        },
        withElement: (element: IQuerySchemeElement):void => {
            const handle = handles.get(element.type);
            if (handle) {
                handle(element);
            }
            history.push(element.type);
        },
        build:():string => query.join(' ')
    }
    return builder;
}