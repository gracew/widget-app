import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { API_DEFINITION } from "../../queries";
import { Operations } from "./define/Operations";

export function EditOperations() {
  const { id } = useParams();
  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });

  if (loading) {
    return <p>Loading</p>;
  }
  if (!data.api) {
    return <p>Not found</p>;
  }

  return (
    <div>
      <h2>Operations</h2>
      <Operations definition={data.api.definition} />
    </div>
  );
}
