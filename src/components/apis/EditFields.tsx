import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FieldDefinition } from "../../graphql/types";
import { API_DEFINITION, UPDATE_API } from "../../queries";
import { SaveCancel } from "../SaveCancel";
import { Fields } from "./define/Fields";

export function EditFields() {
  const { id } = useParams();
  const history = useHistory();

  const [name, setName] = useState<string | undefined>();
  const [fields, setFields] = useState<FieldDefinition[]>([]);

  const { loading } = useQuery(API_DEFINITION, {
    variables: { id },
    onCompleted: data => {
      setName(data.api && data.api.name);
      setFields(data.api && data.api.fields);
    }
  });
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
      <Fields
        name={name}
        fields={fields}
        setName={setName}
        setFields={setFields}
      />
      <SaveCancel onSave={() => handleSave(name!, fields)} />
    </div>
  );
}
