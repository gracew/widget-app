import { Button, ButtonGroup } from "@blueprintjs/core";
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
  const [selected, setSelected] = useState(BeforeAfter.BEFORE);

  return (
    <div>
      <ButtonGroup className="wi-custom-logic-select">
        <Button
          active={selected === BeforeAfter.BEFORE}
          onClick={() => setSelected(BeforeAfter.BEFORE)}
          text="Before DB"
        />
        <Button
          active={selected === BeforeAfter.AFTER}
          onClick={() => setSelected(BeforeAfter.AFTER)}
          text="After DB"
        />
      </ButtonGroup>
      {selected === BeforeAfter.BEFORE && (
        <MonacoEditor
          width="700"
          height="300"
          theme="vs-dark"
          value={before}
          language="json"
          onChange={newValue => setBefore(newValue)}
          options={MONACO_OPTIONS}
        />
      )}
      {selected === BeforeAfter.AFTER && (
        <MonacoEditor
          width="700"
          height="300"
          theme="vs-dark"
          value={after}
          language="json"
          onChange={newValue => setAfter(newValue)}
          options={MONACO_OPTIONS}
        />
      )}
    </div>
  );
}
