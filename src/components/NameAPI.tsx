import { useMutation } from "@apollo/react-hooks";
import { Button, InputGroup } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";

const CREATE_API = gql`
  mutation CreateAPI($name: String!) {
    createAPI(input: { name: $name }) {
      id
      name
    }
  }
`;

export function NameAPI() {
  const history = useHistory();
  const [createApi, { loading, error }] = useMutation(CREATE_API);
  let input: HTMLInputElement | null;

  function handleSubmit() {
    // TODO(gracew): handle null case better
    createApi({ variables: { name: input!.value } });
    history.push("/define");
  }

  return (
    <div>
      <h2>What kind of API are you making?</h2>
      <InputGroup
        placeholder="e.g. comments, posts"
        inputRef={node => {
          input = node;
        }}
      ></InputGroup>

      <div className="arrows">
        <Button icon="arrow-left" />
        <Button rightIcon="arrow-right" onClick={handleSubmit} />
      </div>
    </div>
  );
}
