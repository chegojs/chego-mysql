import { QuerySyntaxEnum, PropertyOrLogicalOperatorScope, IQuerySchemeElement, Property } from '@chego/chego-api';

export type MySQLSyntaxTemplateData = {negation?:boolean, property?:string}
export type MySQLSyntaxTemplate = (data?:MySQLSyntaxTemplateData) => (...values:any[]) => string;
export type LogicalOperatorHandleData = {operator:QuerySyntaxEnum, condition:QuerySyntaxEnum, negation:boolean, properties:PropertyOrLogicalOperatorScope[], values:any[]}
export type QueryBuilderHandle = (element:IQuerySchemeElement) => void
export type UseTemplateData = {type: QuerySyntaxEnum, negation?: boolean, property?: Property, values?: any}