import { useMutation } from "@apollo/react-hooks";
import { Button, Tab, Tabs } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Language, OperationType } from "../../graphql/types";
import { MONACO_OPTIONS } from "../../monaco";
import "./CustomLogicEditor.css";

const SAVE_CUSTOM_LOGIC = gql`
  mutation SaveCustomLogic(
    $apiID: ID!
    $language: Language!
    $operationType: OperationType!
    $beforeSave: String
    $afterSave: String
  ) {
    saveCustomLogic(
      input: {
        apiID: $apiID
        language: $language
        operationType: $operationType
        beforeSave: $beforeSave
        afterSave: $afterSave
      }
    )
  }
`;

interface CustomLogicEditorProps {
  apiID: string;
  language: Language;
  operationType: OperationType;
  currBeforeSave: string | null | undefined;
  currAfterSave: string | null | undefined;
}

export function CustomLogicEditor({
  apiID,
  language,
  operationType,
  currBeforeSave,
  currAfterSave
}: CustomLogicEditorProps) {
  const [beforeSave, setBeforeSave] = useState(currBeforeSave);
  const [afterSave, setAfterSave] = useState(currAfterSave);
  const [saveCustomLogic, _] = useMutation(SAVE_CUSTOM_LOGIC);

  function onClick() {
    saveCustomLogic({
      variables: {
        apiID,
        language,
        operationType,
        beforeSave,
        afterSave
      }
    });
  }

  const beforePanel = (
    <MonacoEditor
      width="700"
      height="300"
      theme="vs-dark"
      value={beforeSave}
      language="json"
      onChange={newValue => setBeforeSave(newValue)}
      options={MONACO_OPTIONS}
    />
  );
  const afterPanel = (
    <MonacoEditor
      width="700"
      height="300"
      theme="vs-dark"
      value={afterSave}
      language="json"
      onChange={newValue => setAfterSave(newValue)}
      options={MONACO_OPTIONS}
    />
  );

  return (
    <div>
      <Tabs id="before-after" renderActiveTabPanelOnly={true}>
        <Tab id="before" title="Before Save" panel={beforePanel} />
        <Tab id="after" title="After Save" panel={afterPanel} />
      </Tabs>
      <Button
        className="wi-custom-logic-save"
        text="Save"
        intent="primary"
        onClick={onClick}
      />
    </div>
  );
}
