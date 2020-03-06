import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  CustomLogic,
  OperationDefinition,
  OperationType
} from "../../graphql/types";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";
import { CustomLogicEditor } from "./CustomLogicEditor";
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

const CUSTOM_LOGIC = gql`
  query CUSTOM_LOGIC($apiID: ID!) {
    customLogic(apiID: $apiID) {
      apiID
      operationType
      beforeSave
      afterSave
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
  const {
    data: customLogicData,
    loading: customLogicLoading
  } = useQuery(CUSTOM_LOGIC, { variables: { apiID: id } });

  if (loading || customLogicLoading) {
    return <p>Loading</p>;
  }

  const includeCreate =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.find(
      (el: OperationDefinition) => el.type === OperationType.Create
    );
  const includeRead =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.find(
      (el: OperationDefinition) => el.type === OperationType.Read
    );
  const includeList =
    data.api.definition.operations.length === 0 ||
    data.api.definition.operations.find(
      (el: OperationDefinition) => el.type === OperationType.Update
    );

  const createCustomLogic: CustomLogic = customLogicData.customLogic.find(
    (el: CustomLogic) => el.operationType === OperationType.Create
  );
  const readCustomLogic: CustomLogic = customLogicData.customLogic.find(
    (el: CustomLogic) => el.operationType === OperationType.Read
  );
  const listCustomLogic = customLogicData.customLogic.find(
    (el: CustomLogic) => el.operationType === OperationType.List
  );

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
            <CustomLogicEditor
              apiID={id!}
              operationType={OperationType.Create}
              currBeforeSave={createCustomLogic && createCustomLogic.beforeSave}
              currAfterSave={createCustomLogic && createCustomLogic.afterSave}
            />
          </CollapseContainer>
        )}

        {includeRead && (
          <CollapseContainer
            title={`Read a ${data.api.name}`}
            open={readOpen}
            setOpen={setReadOpen}
          >
            <CustomLogicEditor
              apiID={id!}
              operationType={OperationType.Read}
              currBeforeSave={readCustomLogic && readCustomLogic.beforeSave}
              currAfterSave={readCustomLogic && readCustomLogic.afterSave}
            />
          </CollapseContainer>
        )}

        {includeList && (
          <CollapseContainer
            title={`List ${data.api.name}s`}
            open={listOpen}
            setOpen={setListOpen}
          >
            <CustomLogicEditor
              apiID={id!}
              operationType={OperationType.List}
              currBeforeSave={listCustomLogic && listCustomLogic.beforeSave}
              currAfterSave={listCustomLogic && listCustomLogic.afterSave}
            />
          </CollapseContainer>
        )}

        <Arrows next={() => history.push(DEPLOY_API(id!))} />
      </div>
    </div>
  );
}
