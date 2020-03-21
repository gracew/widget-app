import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { FieldDefinition } from "../../graphql/types";
import { API_DEFINITION, UPDATE_API } from "../../queries";
import { DefineAPI } from "./define/Fields";

export function EditFields() {
  const history = useHistory();

  const { id } = useParams();
  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });

  const [updateApi, _] = useMutation(UPDATE_API);

  async function handleSave(name: string, fields: FieldDefinition[]) {
    await updateApi({
      variables: {
        input: { id, fields }
      }
    });
    history.goBack();
  }

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>Edit API</h2>
      <DefineAPI
        saveDefinition={handleSave}
        initialName={data.api.name}
        initialFields={data.api.fields}
      />
    </div>
  );
}
