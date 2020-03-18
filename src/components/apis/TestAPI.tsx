import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { API_DEFINITION, TEST_TOKENS } from "../../queries";
import { Arrows } from "../Arrows";
import { CollapseContainer } from "./objects/CollapseContainer";
import { CreateObject } from "./objects/CreateObject";
import { ListObject } from "./objects/ListObject";
import { ReadObject } from "./objects/ReadObject";

export function TestAPI() {
  const { id, deployId } = useParams();

  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });
  const { data: testTokensData, loading: testTokenLoading } = useQuery(
    TEST_TOKENS
  );

  if (loading || testTokenLoading) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>Test API</h2>
      <div>
        {data.api.definition.operations.create && (
          <CollapseContainer title={`Create a ${data.api.name}`}>
            <CreateObject
              apiId={id!}
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {data.api.definition.operations.read && (
          <CollapseContainer title={`Read a ${data.api.name}`}>
            <ReadObject
              apiId={id!}
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {data.api.definition.operations.list && (
          <CollapseContainer title={`List ${data.api.name}s`}>
            <ListObject
              apiId={id!}
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        <Arrows showNext={false} />
      </div>
    </div>
  );
}
