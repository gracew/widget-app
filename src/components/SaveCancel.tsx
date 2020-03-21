import { Button } from "@blueprintjs/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./SaveCancel.css";

interface SaveCancelProps {
  onClick: () => void;
}

export function SaveCancel({ onClick }: SaveCancelProps) {
  const history = useHistory();
  // color of loader is blueprint @gray4
  return (
    <div className="wi-save-cancel">
      <Button text="Save" intent="primary" onClick={onClick} />
      <Button text="Cancel" onClick={history.goBack} />
    </div>
  );
}
