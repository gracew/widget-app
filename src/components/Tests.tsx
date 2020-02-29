import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Button,
  ControlGroup,
  FormGroup,
  HTMLTable,
  InputGroup
} from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { TEST_TOKENS } from "../queries";

const ADD_TEST_TOKEN = gql`
  mutation AddTestToken($label: String!, $token: String!) {
    addTestToken(input: { label: $label, token: $token }) {
      label
      token
    }
  }
`;

function maskToken(token: string) {
  if (token.length < 4) {
    return "*".repeat(token.length);
  } else {
    return "*".repeat(token.length - 4) + token.substring(token.length - 4);
  }
}

export function Tests() {
  const [label, setLabel] = useState("");
  const [token, setToken] = useState("");

  const { loading, error, data } = useQuery(TEST_TOKENS);
  const [addTestToken, _] = useMutation(ADD_TEST_TOKEN, {
    update(cache, { data: { addTestToken } }) {
      const cachedRes: any = cache.readQuery({ query: TEST_TOKENS });
      const tokens = (cachedRes && cachedRes.testTokens.testTokens) || [];
      cache.writeQuery({
        query: TEST_TOKENS,
        data: { testTokens: { testTokens: tokens.concat([addTestToken]) } }
      });
    }
  });

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      {data.testTokens.testTokens.length > 0 && (
        <div>
          <h2>Test Tokens</h2>
          <HTMLTable striped={true}>
            <thead>
              <tr>
                <th>Label</th>
                <th>Token</th>
              </tr>
            </thead>
            <tbody>
              {data.testTokens.testTokens.map(
                ({ label, token }: { label: string; token: string }) => (
                  <tr>
                    <td>{label}</td>
                    <td>{maskToken(token)}</td>
                  </tr>
                )
              )}
            </tbody>
          </HTMLTable>
        </div>
      )}
      <h2>Add a new test token</h2>
      <FormGroup label="Label">
        <InputGroup
          value={label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLabel(e.target.value)
          }
        />
      </FormGroup>
      <FormGroup label="Token">
        <InputGroup
          value={token}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToken(e.target.value)
          }
        />
      </FormGroup>
      <ControlGroup>
        <Button
          text="Add"
          intent="primary"
          onClick={() => addTestToken({ variables: { label, token } })}
        />
      </ControlGroup>
    </div>
  );
}
