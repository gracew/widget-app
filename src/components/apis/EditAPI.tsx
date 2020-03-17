import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ApiDefinition, OperationType, SortOrder } from "../../graphql/types";
import { API_DEFINITION } from "../../queries";
import { CREATED_AT } from "../../strings";
import { DefineAPI } from "./DefineAPI";
import "./DefineAPI.css";

const UPDATE_API = gql`
  mutation UpdateAPI($id: ID!, $rawDefinition: String!) {
    updateAPI(input: { id: $id, rawDefinition: $rawDefinition }) {
      id
      name
    }
  }
`;

export function EditAPI() {
  const history = useHistory();

  const { id } = useParams();
  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });

  const [updateApi, _] = useMutation(UPDATE_API);

  async function handleSave(definition: ApiDefinition) {
    await updateApi({
      variables: { id, rawDefinition: JSON.stringify(definition) }
    });
    history.goBack();
  }

  if (loading) {
    return <p>Loading</p>;
  }

  const definition: ApiDefinition = data.api.definition;

  const initialList = definition.operations.find(
    o => o.type === OperationType.List
  );
  return (
    <div>
      <h2>Edit API</h2>
      <DefineAPI
        saveDefinition={handleSave}
        initialName={definition.name}
        initialCreate={definition.operations.some(
          o => o.type === OperationType.Create
        )}
        initialRead={definition.operations.some(
          o => o.type === OperationType.Read
        )}
        initialList={initialList !== undefined}
        initialFields={definition.fields}
        initialSortField={
          (initialList &&
            initialList.sort &&
            initialList.sort.length > 0 &&
            initialList.sort[0].order) ||
          CREATED_AT
        }
        initialSortOrder={
          (initialList &&
            initialList.sort &&
            initialList.sort.length > 0 &&
            initialList.sort[0].order) ||
          SortOrder.Desc
        }
      />
    </div>
  );
}
