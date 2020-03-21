import { useQuery } from "@apollo/react-hooks";
import { HTMLSelect } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { CustomLogic, Language, OperationType } from "../../graphql/types";
import { API_DEFINITION } from "../../queries";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";
import { SaveCancel } from "../SaveCancel";
import "./CustomizeAPI.css";
import { CustomLogicEditor } from "./CustomLogicEditor";
import { CollapseContainer } from "./objects/CollapseContainer";

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
  const query = new URLSearchParams(useLocation().search);
  const edit = query.get("edit") === "true";
  const history = useHistory();

  const [language, setLanguage] = useState(Language.Javascript);

  const { data, loading } = useQuery(API_DEFINITION, { variables: { id } });
  const {
    data: customLogicData,
    loading: customLogicLoading
  } = useQuery(CUSTOM_LOGIC, { variables: { apiID: id } });

  if (loading || customLogicLoading) {
    return <p>Loading</p>;
  }

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
      {data.api.operations.create && (
        <CollapseContainer title={`Create a ${data.api.name}`}>
          <CustomLogicEditor
            apiID={id!}
            language={language}
            operationType={OperationType.Create}
            currBefore={createCustomLogic && createCustomLogic.before}
            currAfter={createCustomLogic && createCustomLogic.after}
          />
        </CollapseContainer>
      )}
      {!edit && <Arrows next={() => history.push(DEPLOY_API(id!))} />}
      {edit && <SaveCancel onClick={history.goBack} />}
    </div>
  );
}
