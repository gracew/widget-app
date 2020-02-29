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

export type Auth = {
   __typename?: 'Auth',
  authenticationType: AuthenticationType,
  readPolicy: AuthPolicy,
  writePolicy: AuthPolicy,
};

export type AuthApiInput = {
  apiID: Scalars['ID'],
  authenticationType: AuthenticationType,
  readPolicy: AuthPolicyInput,
  writePolicy: AuthPolicyInput,
};

export enum AuthenticationType {
  BuiltIn = 'BUILT_IN'
}

export type AuthPolicy = {
   __typename?: 'AuthPolicy',
  type: AuthPolicyType,
  userAttribute?: Maybe<Scalars['String']>,
  objectAttribute?: Maybe<Scalars['String']>,
};

export type AuthPolicyInput = {
  type: AuthPolicyType,
  userAttribute?: Maybe<Scalars['String']>,
  objectAttribute?: Maybe<Scalars['String']>,
};

export enum AuthPolicyType {
  CreatedBy = 'CREATED_BY',
  AttributeMatch = 'ATTRIBUTE_MATCH',
  Custom = 'CUSTOM'
}

export type Constraint = {
   __typename?: 'Constraint',
  minInt?: Maybe<Scalars['Int']>,
  maxInt?: Maybe<Scalars['Int']>,
  minFloat?: Maybe<Scalars['Float']>,
  maxFloat?: Maybe<Scalars['Float']>,
  regex?: Maybe<Scalars['String']>,
  minLength?: Maybe<Scalars['Int']>,
  maxLength?: Maybe<Scalars['Int']>,
};

export type DefineApiInput = {
  rawDefinition: Scalars['String'],
};

export type Deploy = {
   __typename?: 'Deploy',
  id: Scalars['ID'],
  apiID: Scalars['ID'],
  env: Environment,
};

export type DeployApiInput = {
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
  optional?: Maybe<Scalars['Boolean']>,
  list?: Maybe<Scalars['Boolean']>,
  constraints: Constraint,
};

export type Mutation = {
   __typename?: 'Mutation',
  defineAPI: Api,
  updateAPI: Api,
  authAPI: Scalars['Boolean'],
  deployAPI: Deploy,
  addTestToken: TestToken,
};


export type MutationDefineApiArgs = {
  input: DefineApiInput
};


export type MutationUpdateApiArgs = {
  input: UpdateApiInput
};


export type MutationAuthApiArgs = {
  input: AuthApiInput
};


export type MutationDeployApiArgs = {
  input: DeployApiInput
};


export type MutationAddTestTokenArgs = {
  input: TestTokenInput
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
  auth?: Maybe<Auth>,
  testTokens: TestTokenResponse,
};


export type QueryApiArgs = {
  id: Scalars['ID']
};


export type QueryAuthArgs = {
  apiID: Scalars['ID']
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

export type TestToken = {
   __typename?: 'TestToken',
  label: Scalars['String'],
  token: Scalars['String'],
};

export type TestTokenInput = {
  label: Scalars['String'],
  token: Scalars['String'],
};

export type TestTokenResponse = {
   __typename?: 'TestTokenResponse',
  testTokens: Array<TestToken>,
};

export enum Type {
  Float = 'FLOAT',
  Int = 'INT',
  Boolean = 'BOOLEAN',
  String = 'STRING'
}

export type UpdateApiInput = {
  apiID: Scalars['ID'],
  rawDefinition: Scalars['String'],
};
