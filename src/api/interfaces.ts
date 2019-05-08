import { IQuerySchemeElement } from '@chego/chego-api';

export interface IQueryBuilder {
    withInnerQuery(query:string):void;
    withElement(element: IQuerySchemeElement):void;
    build():string;
}