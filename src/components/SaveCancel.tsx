import { Button } from "@blueprintjs/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./SaveCancel.css";

interface SaveCancelProps {
  onSave: () => void;
}

export function SaveCancel({ onSave }: SaveCancelProps) {
  const history = useHistory();
  return (
    <div className="wi-save-cancel">
      <Button text="Save" intent="primary" onClick={onSave} />
      <Button text="Cancel" onClick={history.goBack} />
    </div>
  );
}
