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

  const includeCreate =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.find((el: any) => el.type === "CREATE");
  const includeRead =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.find((el: any) => el.type === "READ");
  const includeList =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.find((el: any) => el.type === "LIST");

  return (
    <div>
      <h2>Test API</h2>
      <div>
        {includeCreate && (
          <CollapseContainer title={`Create a ${data.api.name}`}>
            <CreateObject
              apiId={id!}
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {includeRead && (
          <CollapseContainer title={`Read a ${data.api.name}`}>
            <ReadObject
              apiId={id!}
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {includeList && (
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
