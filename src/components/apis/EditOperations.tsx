import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { OperationDefinition, SortOrder } from "../../graphql/types";
import { API_DEFINITION } from "../../queries";
import { AUTH_API } from "../../routes";
import { CREATED_AT } from "../../strings";
import { Operations } from "./define/Operations";

const UPDATE_OPERATIONS = gql`
  mutation UpdateOperations($id: ID!, $operations: OperationDefinitionInput!) {
    updateAPI(input: { id: $id, operations: $operations }) {
      id
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
export function EditOperations() {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });
  const [updateApi, _] = useMutation(UPDATE_OPERATIONS);

  async function handleNext(operations: OperationDefinition) {
    await updateApi({
      variables: { id, operations }
    });
    history.push(AUTH_API(id!));
  }

  if (loading) {
    return <p>Loading</p>;
  }
  if (!data.api) {
    return <p>Not found</p>;
  }

  return (
    <div>
      <h2>Operations</h2>
      <Operations
        saveDefinition={handleNext}
        definition={
          data.api.operations || {
            create: { enabled: true },
            read: { enabled: true },
            list: {
              enabled: true,
              sort: [{ field: CREATED_AT, order: SortOrder.Desc }],
              filter: []
            }
          }
        }
        fields={data.api.fields}
      />
    </div>
  );
}
