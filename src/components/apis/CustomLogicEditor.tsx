import { useMutation } from "@apollo/react-hooks";
import { Tab, Tabs } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Language, OperationType } from "../../graphql/types";
import { MONACO_OPTIONS } from "../../monaco";
import { ButtonLoading } from "./ButtonLoading";
import "./CustomLogicEditor.css";

const SAVE_CUSTOM_LOGIC = gql`
  mutation SaveCustomLogic(
    $apiID: ID!
    $language: Language!
    $operationType: OperationType!
    $before: String
    $after: String
  ) {
    saveCustomLogic(
      input: {
        apiID: $apiID
        language: $language
        operationType: $operationType
        before: $before
        after: $after
      }
    )
  }
`;

interface CustomLogicEditorProps {
  apiID: string;
  language: Language;
  operationType: OperationType;
  currBefore: string | null | undefined;
  currAfter: string | null | undefined;
}

export function CustomLogicEditor({
  apiID,
  language,
  operationType,
  currBefore,
  currAfter
}: CustomLogicEditorProps) {
  const [before, setBefore] = useState(currBefore);
  const [after, setAfter] = useState(currAfter);
  const [saveCustomLogic, { data, loading }] = useMutation(SAVE_CUSTOM_LOGIC);

  function onClick() {
    saveCustomLogic({
      variables: {
        apiID,
        language,
        operationType,
        before,
        after
      }
    });
  }

  const beforePanel = (
    <MonacoEditor
      width="700"
      height="300"
      theme="vs-dark"
      value={before}
      language="json"
      onChange={newValue => setBefore(newValue)}
      options={MONACO_OPTIONS}
    />
  );
  const afterPanel = (
    <MonacoEditor
      width="700"
      height="300"
      theme="vs-dark"
      value={after}
      language="json"
      onChange={newValue => setAfter(newValue)}
      options={MONACO_OPTIONS}
    />
  );

  return (
    <div>
      <Tabs id="before-after" renderActiveTabPanelOnly={true}>
        <Tab id="before" title="Before" panel={beforePanel} />
        <Tab id="after" title="After" panel={afterPanel} />
      </Tabs>
      <ButtonLoading
        text="Save"
        className="wi-custom-logic-save"
        loading={loading}
        success={data && data.saveCustomLogic}
        onClick={onClick}
      />
    </div>
  );
}
