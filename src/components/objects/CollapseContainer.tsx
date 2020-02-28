import { Button, Collapse } from "@blueprintjs/core";
import React from "react";
import "./CollapseContainer.css";

interface ICollapseContainerProps {
  title: string;
  children: any;
  open: boolean;
  setOpen: (b: boolean) => void;
}

export function CollapseContainer({
  title,
  children,
  open,
  setOpen
}: ICollapseContainerProps) {
  return (
    <div className="wi-collapse">
      <Button
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
