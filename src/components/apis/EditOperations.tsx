import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { API_DEFINITION, OPERATIONS_FRAGMENT } from "../../graphql/queries";
import { OperationDefinition, SortOrder } from "../../graphql/types";
import { AUTH_API } from "../../routes";
import { CREATED_AT } from "../../strings";
import { Arrows } from "../Arrows";
import { SaveCancel } from "../SaveCancel";
import { Operations } from "./operations/Operations";

const UPDATE_OPERATIONS = gql`
  mutation UpdateOperations($id: ID!, $operations: OperationDefinitionInput!) {
    updateAPI(input: { id: $id, operations: $operations }) {
      id
      ...OperationsDefinition
    }
  }
  ${OPERATIONS_FRAGMENT}
`;

export function EditOperations() {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const edit = query.get("edit") === "true";
  const history = useHistory();

  const [operations, setOperations] = useState<
    OperationDefinition | undefined
  >();

  const { data, loading } = useQuery(API_DEFINITION, {
    variables: { id },
    onCompleted: d =>
      setOperations(
        d.api.operations || {
          create: { enabled: true },
          read: { enabled: true },
          list: {
            enabled: true,
            sort: [{ field: CREATED_AT, order: SortOrder.Desc }],
            filter: []
          },
          update: {
            enabled: false,
            actions: []
          },
          delete: { enabled: false }
        }
      )
  });
  const [updateApi, _] = useMutation(UPDATE_OPERATIONS);

  async function handleSave() {
    await updateApi({
      variables: { id, operations }
    });
    if (edit) {
      history.goBack();
    } else {
      history.push(AUTH_API(id!));
    }
  }

  if (loading || !operations) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>Operations</h2>
      <Operations
        setOperations={setOperations}
        operations={operations}
        fields={data.api.fields}
      />
      {!edit && <Arrows next={handleSave} />}
      {edit && <SaveCancel onSave={handleSave} />}
    </div>
  );
}
