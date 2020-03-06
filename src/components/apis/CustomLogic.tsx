import { Tab, Tabs } from "@blueprintjs/core";
import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { MONACO_OPTIONS } from "../../monaco";
import "./CustomLogic.css";

enum BeforeAfter {
  BEFORE,
  AFTER
}

interface CustomLogicProps {
  // onSubmit: (token: string) => void;
}

export function CustomLogic({}: CustomLogicProps) {
  const [before, setBefore] = useState("");
  const [after, setAfter] = useState("");
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
        <Tab id="before" title="Before Save" panel={beforePanel} />
        <Tab id="after" title="After Save" panel={afterPanel} />
      </Tabs>
    </div>
  );
}
