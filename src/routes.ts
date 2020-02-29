export const NEW_API = "/apis/new";
export const EDIT_API = (apiId: string) => `/apis/${apiId}/edit`;
export const AUTH_API = (apiId: string) => `/apis/${apiId}/auth`;

export const DEPLOY_API = (apiId: string) => `/apis/${apiId}/deploys`;
export const TEST_API = (apiId: string, deployId: string) =>
  `/apis/${apiId}/deploys/${deployId}`;

export const LIST_APIS = "/apis/list";

export const TESTS = "/tests";
