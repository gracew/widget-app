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
  fields: Array<FieldDefinition>,
  deploys: Array<Deploy>,
  operations?: Maybe<OperationDefinition>,
};

export type Auth = {
   __typename?: 'Auth',
  apiID: Scalars['ID'],
  readPolicy: AuthPolicy,
  writePolicy: AuthPolicy,
};

export type AuthApiInput = {
  apiID: Scalars['ID'],
  readPolicy: AuthPolicyInput,
  writePolicy: AuthPolicyInput,
};

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

export type ConstraintInput = {
  minInt?: Maybe<Scalars['Int']>,
  maxInt?: Maybe<Scalars['Int']>,
  minFloat?: Maybe<Scalars['Float']>,
  maxFloat?: Maybe<Scalars['Float']>,
  regex?: Maybe<Scalars['String']>,
  minLength?: Maybe<Scalars['Int']>,
  maxLength?: Maybe<Scalars['Int']>,
};

export type CreateDefinition = {
   __typename?: 'CreateDefinition',
  enabled: Scalars['Boolean'],
};

export type CreateDefinitionInput = {
  enabled: Scalars['Boolean'],
};

export type CustomLogic = {
   __typename?: 'CustomLogic',
  apiID: Scalars['ID'],
  operationType: OperationType,
  language: Language,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
};

export type DefineApiInput = {
  name: Scalars['String'],
  fields: Array<FieldDefinitionInput>,
};

export type Deploy = {
   __typename?: 'Deploy',
  id: Scalars['ID'],
  apiID: Scalars['ID'],
  env: Environment,
};

export type DeployApiInput = {
  apiID: Scalars['ID'],
  deployID: Scalars['ID'],
  env: Environment,
};

export enum DeployStatus {
  InProgress = 'IN_PROGRESS',
  Complete = 'COMPLETE',
  Failed = 'FAILED'
}

export type DeployStatusResponse = {
   __typename?: 'DeployStatusResponse',
  steps: Array<DeployStepStatus>,
};

export enum DeployStep {
  GenerateCode = 'GENERATE_CODE',
  BuildImage = 'BUILD_IMAGE',
  LaunchContainer = 'LAUNCH_CONTAINER',
  LaunchCustomLogicContainer = 'LAUNCH_CUSTOM_LOGIC_CONTAINER'
}

export type DeployStepStatus = {
   __typename?: 'DeployStepStatus',
  deployID: Scalars['ID'],
  step: DeployStep,
  status: DeployStatus,
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
  constraints?: Maybe<Constraint>,
  customLogicPopulated?: Maybe<Scalars['Boolean']>,
};

export type FieldDefinitionInput = {
  name: Scalars['String'],
  type: Type,
  customType?: Maybe<Scalars['String']>,
  optional?: Maybe<Scalars['Boolean']>,
  list?: Maybe<Scalars['Boolean']>,
  constraints?: Maybe<ConstraintInput>,
  customLogicPopulated?: Maybe<Scalars['Boolean']>,
};

export enum Language {
  Javascript = 'JAVASCRIPT',
  Python = 'PYTHON'
}

export type ListDefinition = {
   __typename?: 'ListDefinition',
  enabled: Scalars['Boolean'],
  sort: Array<SortDefinition>,
  filter: Array<Scalars['String']>,
};

export type ListDefinitionInput = {
  enabled: Scalars['Boolean'],
  sort: Array<SortDefinitionInput>,
  filter: Array<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  defineAPI: Api,
  updateAPI: Api,
  deleteAPI: Scalars['Boolean'],
  authAPI: Scalars['Boolean'],
  saveCustomLogic: Scalars['Boolean'],
  deployAPI: Deploy,
  addTestToken: TestToken,
};


export type MutationDefineApiArgs = {
  input: DefineApiInput
};


export type MutationUpdateApiArgs = {
  input: UpdateApiInput
};


export type MutationDeleteApiArgs = {
  id: Scalars['ID']
};


export type MutationAuthApiArgs = {
  input: AuthApiInput
};


export type MutationSaveCustomLogicArgs = {
  input: SaveCustomLogicInput
};


export type MutationDeployApiArgs = {
  input: DeployApiInput
};


export type MutationAddTestTokenArgs = {
  input: TestTokenInput
};

export type OperationDefinition = {
   __typename?: 'OperationDefinition',
  create: CreateDefinition,
  read: ReadDefinition,
  list: ListDefinition,
};

export type OperationDefinitionInput = {
  create: CreateDefinitionInput,
  read: ReadDefinitionInput,
  list: ListDefinitionInput,
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
  customLogic: Array<CustomLogic>,
  deployStatus: DeployStatusResponse,
  testTokens: TestTokenResponse,
};


export type QueryApiArgs = {
  id: Scalars['ID']
};


export type QueryAuthArgs = {
  apiID: Scalars['ID']
};


export type QueryCustomLogicArgs = {
  apiID: Scalars['ID']
};


export type QueryDeployStatusArgs = {
  deployID: Scalars['ID']
};

export type ReadDefinition = {
   __typename?: 'ReadDefinition',
  enabled: Scalars['Boolean'],
};

export type ReadDefinitionInput = {
  enabled: Scalars['Boolean'],
};

export type SaveCustomLogicInput = {
  apiID: Scalars['ID'],
  operationType: OperationType,
  language: Language,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
};

export type SortDefinition = {
   __typename?: 'SortDefinition',
  field: Scalars['String'],
  order: SortOrder,
};

export type SortDefinitionInput = {
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
  String = 'STRING',
  List = 'LIST'
}

export type UpdateApiInput = {
  id: Scalars['ID'],
  fields?: Maybe<Array<FieldDefinitionInput>>,
  operations?: Maybe<OperationDefinitionInput>,
};
