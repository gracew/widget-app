import { Button, Collapse } from "@blueprintjs/core";
import React, { useState } from "react";
import "./CollapseContainer.css";

interface ICollapseContainerProps {
  title: string;
  children: any;
}

export function CollapseContainer({
  title,
  children
}: ICollapseContainerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="wi-collapse">
      <Button
        icon={open ? "caret-down" : "caret-right"}
        className="wi-collapse-button"
        minimal={true}
        onClick={() => setOpen(!open)}
      >
        <h3>{title}</h3>
      </Button>
      <Collapse isOpen={open}>{children}</Collapse>
    </div>
  );
}
