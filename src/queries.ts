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
