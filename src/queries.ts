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

export const API_DEFINITION = gql`
  query ApiDefinition($id: ID!) {
    api(id: $id) {
      name
      definition {
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
  }
`;

export const UPDATE_API = gql`
  mutation UpdateAPI($id: ID!, $rawDefinition: String!) {
    updateAPI(input: { id: $id, rawDefinition: $rawDefinition }) {
      id
      name
    }
  }
`;
