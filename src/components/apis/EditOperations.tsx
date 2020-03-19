import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { OperationDefinition } from "../../graphql/types";
import { API_DEFINITION, UPDATE_API } from "../../queries";
import { AUTH_API } from "../../routes";
import { Operations } from "./define/Operations";

export function EditOperations() {
  const { id } = useParams();
  const history = useHistory();
  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });
  const [updateApi, _] = useMutation(UPDATE_API);

  async function handleNext(operations: OperationDefinition) {
    const definition = {
      ...data.api.definition,
      operations
    };
    await updateApi({
      variables: { id, rawDefinition: JSON.stringify(definition) }
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
        definition={data.api.definition}
      />
    </div>
  );
}
