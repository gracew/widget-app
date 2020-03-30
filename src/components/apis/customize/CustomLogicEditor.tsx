import { Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { CustomLogic, Language } from "../../../graphql/types";
import { MONACO_OPTIONS } from "../../../monaco";
import "./CustomLogicEditor.css";

interface CustomLogicEditorProps {
  apiID: string;
  customLogic: CustomLogic;
  setCustomLogic: (customLogic: CustomLogic) => any;
}

export function CustomLogicEditor({
  apiID,
  customLogic,
  setCustomLogic
}: CustomLogicEditorProps) {
  const monacoLang =
    customLogic.language === Language.Javascript ? "javascript" : "python";
  const beforePanel = (
    <MonacoEditor
      width="700"
      height="300"
      theme="vs-dark"
      value={customLogic.before}
      language={monacoLang}
      onChange={newValue =>
        setCustomLogic({ ...customLogic, before: newValue })
      }
      options={MONACO_OPTIONS}
    />
  );
  const afterPanel = (
    <MonacoEditor
      width="700"
      height="300"
      theme="vs-dark"
      value={customLogic.after}
      language={monacoLang}
      onChange={newValue => setCustomLogic({ ...customLogic, after: newValue })}
      options={MONACO_OPTIONS}
    />
  );

  return (
    <div>
      <Tabs id="before-after" renderActiveTabPanelOnly={true}>
        <Tab id="before" title="Before" panel={beforePanel} />
        <Tab id="after" title="After" panel={afterPanel} />
      </Tabs>
    </div>
  );
}
