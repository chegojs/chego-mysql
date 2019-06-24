import { QuerySyntaxEnum, Fn } from '@chego/chego-api';
import { isLogicalOperatorScope, isProperty, isTable } from '@chego/chego-tools';

const validateWhere = (values: any[]): void => {
    if (isLogicalOperatorScope(values[0])) {
        throw new Error('First condition key is logical operator')
    }
    noArgsValidation(values);
}

const noArgsValidation = (...args: any[]): void => {
    if (args.length === 0) {
        throw new Error('No arguments!');
    }
}

const validateSet = (...args: any[]): void => {
    if (args.length > 1) {
        throw new Error('Too many arguments');
    }
    noArgsValidation(...args);
}

const validateEQ = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateLT = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateGT = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateLimit = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateBetween = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateFrom = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateExists = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateHaving = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateUnion = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateOrderBy = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateTo = (...args: any[]): void => {
    noArgsValidation(...args);
}
const validateUpdate = (...args: any[]): void => {
    noArgsValidation(...args);
}
const validateIn = (...args: any[]): void => {
    noArgsValidation(...args);
}
const validateInsert = (...args: any[]): void => {
    noArgsValidation(...args);
}

const validateJoin = (...args: any[]): void => {
    if (!isTable(args[0])) {
        throw new Error(`given argument is not a Property object`);
    }
    noArgsValidation(...args);
}

const validateUsing = (...args: any[]): void => {
    if (!isProperty(args[0])) {
        throw new Error(`given argument is not a Property object`);
    }
    noArgsValidation(...args);
}

const validateOn = (...args: any[]): void => {
    for (const arg of args) {
        if (!isProperty(arg)) {
            throw new Error(`given argument is not a Property object`);
        }
    }
    noArgsValidation(...args);
}

export const validators: Map<QuerySyntaxEnum, Fn<void>> = new Map<QuerySyntaxEnum, Fn<void>>([
    [QuerySyntaxEnum.Where, validateWhere],
    [QuerySyntaxEnum.Set, validateSet],
    [QuerySyntaxEnum.Join, validateJoin],
    [QuerySyntaxEnum.FullJoin, validateJoin],
    [QuerySyntaxEnum.LeftJoin, validateJoin],
    [QuerySyntaxEnum.RightJoin, validateJoin],
    [QuerySyntaxEnum.On, validateOn],
    [QuerySyntaxEnum.EQ, validateEQ],
    [QuerySyntaxEnum.LT, validateLT],
    [QuerySyntaxEnum.GT, validateGT],
    [QuerySyntaxEnum.Limit, validateLimit],
    [QuerySyntaxEnum.Between, validateBetween],
    [QuerySyntaxEnum.From, validateFrom],
    [QuerySyntaxEnum.Exists, validateExists],
    [QuerySyntaxEnum.Having, validateHaving],
    [QuerySyntaxEnum.Union, validateUnion],
    [QuerySyntaxEnum.UnionAll, validateUnion],
    [QuerySyntaxEnum.OrderBy, validateOrderBy],
    [QuerySyntaxEnum.To, validateTo],
    [QuerySyntaxEnum.Update, validateUpdate],
    [QuerySyntaxEnum.In, validateIn],
    [QuerySyntaxEnum.Insert, validateInsert],
    [QuerySyntaxEnum.Using, validateUsing],
]);