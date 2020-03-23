import { gql } from "apollo-boost";

export const TEST_TOKENS = gql`
  {
    testTokens {
      testTokens {
        label
        token
      }
    }
  }
`;

export const OPERATIONS_FRAGMENT = gql`
  fragment OperationsDefinition on API {
    operations {
      create {
        enabled
      }
      read {
        enabled
      }
      list {
        enabled
        sort {
          field
          order
        }
        filter
      }
      update {
        enabled
        actions {
          name
          fields
        }
      }
      delete {
        enabled
      }
    }
  }
`;

export const API_DEFINITION = gql`
  query ApiDefinition($id: ID!) {
    api(id: $id) {
      id
      name
      fields {
        name
        type
        constraints {
          minInt
          maxInt
          minFloat
          maxFloat
          minLength
          maxLength
        }
        customLogicPopulated
      }
      ...OperationsDefinition
    }
  }
  ${OPERATIONS_FRAGMENT}
`;

export const UPDATE_API = gql`
  mutation UpdateAPI($input: UpdateAPIInput!) {
    updateAPI(input: $input) {
      id
    }
  }
`;
