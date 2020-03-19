import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import { FieldDefinition, SortOrder } from "../../graphql/types";
import { EDIT_OPERATIONS } from "../../routes";
import { CREATED_AT } from "../../strings";
import { DefineAPI } from "./define/Fields";
import { ALL_APIS } from "./ListAPIs";

const DEFINE_API = gql`
  mutation DefineAPI($rawDefinition: String!) {
    defineAPI(input: { rawDefinition: $rawDefinition }) {
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
    const definition = {
      name,
      fields,
      operations: {
        create: true,
        read: true,
        list: {
          sort: [{ field: CREATED_AT, order: SortOrder.Desc }],
          filter: []
        }
      }
    };
    const { data } = await defineApi({
      variables: { rawDefinition: JSON.stringify(definition) }
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
