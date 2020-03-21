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

// TODO(gracew): use fragments
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
      }
    }
  }
`;

export const UPDATE_API = gql`
  mutation UpdateAPI($input: UpdateAPIInput!) {
    updateAPI(input: $input) {
      id
    }
  }
`;
