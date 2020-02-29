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
