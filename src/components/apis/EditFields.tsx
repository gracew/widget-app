import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { ApiDefinition, FieldDefinition } from "../../graphql/types";
import { API_DEFINITION, UPDATE_API } from "../../queries";
import { DefineAPI } from "./define/Fields";

export function EditFields() {
  const history = useHistory();

  const { id } = useParams();
  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });

  const [updateApi, _] = useMutation(UPDATE_API);

  async function handleSave(name: string, fields: FieldDefinition[]) {
    const definition = {
      ...data.api.definition,
      name,
      fields
    };
    await updateApi({
      variables: { id, rawDefinition: JSON.stringify(definition) }
    });
    history.goBack();
  }

  if (loading) {
    return <p>Loading</p>;
  }

  const definition: ApiDefinition = data.api.definition;

  return (
    <div>
      <h2>Edit API</h2>
      <DefineAPI
        saveDefinition={handleSave}
        initialName={definition.name}
        initialFields={definition.fields}
      />
    </div>
  );
}
