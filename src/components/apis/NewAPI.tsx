import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import { FieldDefinition } from "../../graphql/types";
import { EDIT_OPERATIONS } from "../../routes";
import { DefineAPI } from "./define/Fields";
import { ALL_APIS } from "./ListAPIs";

const DEFINE_API = gql`
  mutation DefineAPI($input: DefineAPIInput!) {
    defineAPI(input: $input) {
      id
      name
    }
  }
`;

export function NewAPI() {
  const history = useHistory();

  const [defineApi, _] = useMutation(DEFINE_API, {
    update(cache, { data: { defineAPI } }) {
      const cachedRes: any = cache.readQuery({ query: ALL_APIS });
      const apis = (cachedRes && cachedRes.apis) || [];
      cache.writeQuery({
        query: ALL_APIS,
        data: { apis: apis.concat([defineAPI]) }
      });
    }
  });

  async function handleNext(name: string, fields: FieldDefinition[]) {
    const { data } = await defineApi({
      variables: { input: { name, fields } }
    });
    history.push(EDIT_OPERATIONS(data.defineAPI.id));
  }

  return (
    <div>
      <h2>New API</h2>
      <DefineAPI saveDefinition={handleNext} initialFields={[]} />
    </div>
  );
}
