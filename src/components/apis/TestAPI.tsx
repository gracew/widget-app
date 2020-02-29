import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TEST_TOKENS } from "../../queries";
import { Arrows } from "../Arrows";
import { CollapseContainer } from "./objects/CollapseContainer";
import { CreateObject } from "./objects/CreateObject";
import { ListObject } from "./objects/ListObject";
import { ReadObject } from "./objects/ReadObject";

const OBJECTS = gql`
  query GET_API($id: ID!) {
    api(id: $id) {
      name
      definition {
        name
        operations {
          type
          sort {
            field
            order
          }
          filter
        }
        fields {
          name
          type
          constraints {
            minInt
            maxInt
            minFloat
            maxFloat
            minLength
            maxLength
          }
        }
      }
    }
  }
`;
export function TestAPI() {
  const { id, deployId } = useParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const { data, loading } = useQuery(OBJECTS, { variables: { id } });
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
          <CollapseContainer
            title={`Create a ${data.api.name}`}
            open={createOpen}
            setOpen={setCreateOpen}
          >
            <CreateObject
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {includeRead && (
          <CollapseContainer
            title={`Read a ${data.api.name}`}
            open={readOpen}
            setOpen={setReadOpen}
          >
            <ReadObject
              definition={data.api.definition}
              testTokens={testTokensData.testTokens.testTokens}
            />
          </CollapseContainer>
        )}

        {includeList && (
          <CollapseContainer
            title={`List ${data.api.name}s`}
            open={listOpen}
            setOpen={setListOpen}
          >
            <ListObject
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
