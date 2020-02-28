export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Api = {
   __typename?: 'API',
  id: Scalars['ID'],
  name: Scalars['String'],
  deploys: Array<Deploy>,
  definition: ApiDefinition,
};

export type ApiDefinition = {
   __typename?: 'APIDefinition',
  name: Scalars['String'],
  fields: Array<FieldDefinition>,
  operations: Array<OperationDefinition>,
};

export type Constraint = IntConstraint | FloatConstraint | StringLengthConstraint;

export type DefineApi = {
  rawDefinition: Scalars['String'],
};

export type Deploy = {
   __typename?: 'Deploy',
  id: Scalars['ID'],
  apiID: Scalars['ID'],
  env: Environment,
};

export type DeployApi = {
  apiID: Scalars['ID'],
  env: Environment,
};

export enum Environment {
  Sandbox = 'SANDBOX',
  Staging = 'STAGING',
  Production = 'PRODUCTION'
}

export type FieldDefinition = {
   __typename?: 'FieldDefinition',
  name: Scalars['String'],
  type: Type,
  customType?: Maybe<Scalars['String']>,
  constraints: Array<Constraint>,
};

export type FloatConstraint = {
   __typename?: 'FloatConstraint',
  min?: Maybe<Scalars['Float']>,
  max?: Maybe<Scalars['Float']>,
};

export type IntConstraint = {
   __typename?: 'IntConstraint',
  min?: Maybe<Scalars['Int']>,
  max?: Maybe<Scalars['Int']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  defineAPI: Api,
  deployAPI: Deploy,
};


export type MutationDefineApiArgs = {
  input: DefineApi
};


export type MutationDeployApiArgs = {
  input: DeployApi
};

export type OperationDefinition = {
   __typename?: 'OperationDefinition',
  type: OperationType,
  sort?: Maybe<Array<SortDefinition>>,
  filter?: Maybe<Array<Scalars['String']>>,
};

export enum OperationType {
  Create = 'CREATE',
  Update = 'UPDATE',
  Read = 'READ',
  List = 'LIST'
}

export type Query = {
   __typename?: 'Query',
  api?: Maybe<Api>,
  apis: Array<Api>,
};


export type QueryApiArgs = {
  id: Scalars['ID']
};

export type SortDefinition = {
   __typename?: 'SortDefinition',
  field: Scalars['String'],
  order: SortOrder,
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringLengthConstraint = {
   __typename?: 'StringLengthConstraint',
  min?: Maybe<Scalars['Int']>,
  max?: Maybe<Scalars['Int']>,
};

export enum Type {
  Float = 'FLOAT',
  Int = 'INT',
  String = 'STRING'
}
