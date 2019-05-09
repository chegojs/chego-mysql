import { QuerySyntaxEnum } from '@chego/chego-api';

export interface IQueryBuilder {
    with(type:QuerySyntaxEnum,params:any[]):void;
    build():string;
}