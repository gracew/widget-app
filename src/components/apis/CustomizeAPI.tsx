import { useQuery } from "@apollo/react-hooks";
import { HTMLSelect } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  CustomLogic,
  Language,
  OperationDefinition,
  OperationType
} from "../../graphql/types";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";
import "./CustomizeAPI.css";
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
      before
      after
    }
  }
`;
export function CustomizeAPI() {
  const { id } = useParams();
  const history = useHistory();
  const [createOpen, setCreateOpen] = useState(false);
  const [language, setLanguage] = useState(Language.Javascript);

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

  const createCustomLogic: CustomLogic = customLogicData.customLogic.find(
    (el: CustomLogic) => el.operationType === OperationType.Create
  );

  return (
    <div>
      <h2>Customize API</h2>
      Here you can add custom logic to run before or after database access.
      <div className="wi-language-select">
        Select language:
        <HTMLSelect
          value={language}
          onChange={(e: any) => setLanguage(e.currentTarget.value)}
        >
          <option value={Language.Javascript}>Javascript</option>
          <option value={Language.Python}>Python</option>
        </HTMLSelect>
      </div>
      {includeCreate && (
        <CollapseContainer
          title={`Create a ${data.api.name}`}
          open={createOpen}
          setOpen={setCreateOpen}
        >
          <CustomLogicEditor
            apiID={id!}
            language={language}
            operationType={OperationType.Create}
            currBefore={createCustomLogic && createCustomLogic.before}
            currAfter={createCustomLogic && createCustomLogic.after}
          />
        </CollapseContainer>
      )}
      <Arrows next={() => history.push(DEPLOY_API(id!))} />
    </div>
  );
}
