import { Spinner } from "@blueprintjs/core";
import React from "react";
import "./Loading.css";

export function Loading() {
  return (
    <div className="wi-loading">
      <Spinner size={200} />
    </div>
  );
}
