import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";
import { CustomLogic } from "./CustomLogic";
import { CollapseContainer } from "./objects/CollapseContainer";

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
export function CustomizeAPI() {
  const { id } = useParams();
  const history = useHistory();
  const [createOpen, setCreateOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const { data, loading } = useQuery(OBJECTS, { variables: { id } });

  if (loading) {
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
      <h2>Customize API</h2>
      Here you can add custom logic to run before or after database fetch.
      <div>
        {includeCreate && (
          <CollapseContainer
            title={`Create a ${data.api.name}`}
            open={createOpen}
            setOpen={setCreateOpen}
          >
            <CustomLogic />
          </CollapseContainer>
        )}

        {includeRead && (
          <CollapseContainer
            title={`Read a ${data.api.name}`}
            open={readOpen}
            setOpen={setReadOpen}
          >
            <CustomLogic />
          </CollapseContainer>
        )}

        {includeList && (
          <CollapseContainer
            title={`List ${data.api.name}s`}
            open={listOpen}
            setOpen={setListOpen}
          >
            <CustomLogic />
          </CollapseContainer>
        )}

        <Arrows next={() => history.push(DEPLOY_API(id!))} />
      </div>
    </div>
  );
}
