import { useMutation, useQuery } from "@apollo/react-hooks";
import { HTMLSelect } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { API_DEFINITION } from "../../graphql/queries";
import { ActionDefinition, Language } from "../../graphql/types";
import { DEPLOY_API } from "../../routes";
import { Arrows } from "../Arrows";
import { CollapseContainer } from "../CollapseContainer";
import { SaveCancel } from "../SaveCancel";
import { CustomLogicEditor } from "./customize/CustomLogicEditor";
import "./CustomizeAPI.css";

const SAVE_CUSTOM_LOGIC = gql`
  mutation SaveCustomLogic(
    $apiID: ID!
    $create: CustomLogicInput!
    $update: [UpdateCustomLogicInput!]!
    $delete: CustomLogicInput!
  ) {
    saveCustomLogic(
      input: {
        apiID: $apiID
        create: $create
        update: $update
        delete: $delete
      }
    )
  }
`;

export function CustomizeAPI() {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const edit = query.get("edit") === "true";
  const history = useHistory();

  const [language, setLanguage] = useState(Language.Javascript);
  const [create, setCreate] = useState({});
  const [update, setUpdate] = useState<Record<string, {}>>({});
  const [del, setDel] = useState({});

  const { data, loading } = useQuery(API_DEFINITION, {
    variables: { id },
    onCompleted: d => {
      if (d && d.api && d.api.operations) {
        if (d.api.operations.create.customLogic) {
          setCreate(d.api.operations.create.customLogic);
        }
        setUpdate(
          Object.assign(
            {},
            ...d.api.operations.update.actions.map(
              (action: ActionDefinition) => ({
                [action.name]: action.customLogic
              })
            )
          )
        );
        if (d.api.operations.delete.customLogic) {
          setDel(d.api.operations.delete.customLogic);
        }
      }
    }
  });
  const [saveCustomLogic, _] = useMutation(SAVE_CUSTOM_LOGIC);

  async function handleSave() {
    await saveCustomLogic({
      variables: {
        apiID: id,
        create: { ...create, language },
        update: Object.entries(update).map(([actionName, customLogic]) => ({
          actionName,
          customLogic: { ...customLogic, language }
        })),
        delete: { ...del, language }
      }
    });
    if (edit) {
      history.goBack();
    } else {
      history.push(DEPLOY_API(id!));
    }
  }

  if (loading) {
    return <p>Loading</p>;
  }

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
      {data.api.operations.create.enabled && (
        <CollapseContainer title={`Create a ${data.api.name}`}>
          <CustomLogicEditor
            apiID={id!}
            customLogic={{ ...create, language }}
            setCustomLogic={setCreate}
          />
        </CollapseContainer>
      )}
      {data.api.operations.update.enabled &&
        data.api.operations.update.actions.map((action: ActionDefinition) => (
          <CollapseContainer
            key={action.name}
            title={`Update a ${data.api.name}: ${action.name}`}
          >
            <CustomLogicEditor
              apiID={id!}
              customLogic={{ ...update[action.name], language }}
              setCustomLogic={customLogic =>
                setUpdate({ ...update, [action.name]: customLogic })
              }
            />
          </CollapseContainer>
        ))}
      {data.api.operations.delete.enabled && (
        <CollapseContainer title={`Delete a ${data.api.name}`}>
          <CustomLogicEditor
            apiID={id!}
            customLogic={{ ...del, language }}
            setCustomLogic={setDel}
          />
        </CollapseContainer>
      )}
      {!edit && <Arrows next={handleSave} />}
      {edit && <SaveCancel onSave={handleSave} />}
    </div>
  );
}
