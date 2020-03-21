import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { API_DEFINITION, TEST_TOKENS } from "../../queries";
import { Arrows } from "../Arrows";
import { CollapseContainer } from "../CollapseContainer";
import { CreateObject } from "./test/CreateObject";
import { ListObject } from "./test/ListObject";
import { ReadObject } from "./test/ReadObject";

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
        {data.api.operations.create && (
          <CollapseContainer title={`Create a ${data.api.name}`}>
            <CreateObject
              fields={data.api.fields}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {data.api.operations.read && (
          <CollapseContainer title={`Read a ${data.api.name}`}>
            <ReadObject testTokens={testTokensData.testTokens.testTokens} />
          </CollapseContainer>
        )}

        {data.api.operations.list && (
          <CollapseContainer title={`List ${data.api.name}s`}>
            <ListObject
              operations={data.api.operations}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        <Arrows showNext={false} />
      </div>
    </div>
  );
}
