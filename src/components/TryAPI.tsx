import { Button } from "@blueprintjs/core";
import React from "react";

export class TryAPI extends React.Component<{}> {
  public render() {
    return (
      <div>
        <h2>Create an object</h2>
        <h2>Read the object</h2>
        <h2>Update the object</h2>
        <h2>Delete the object</h2>
        <div className="arrows">
          <Button icon="arrow-left" />
          <Button rightIcon="arrow-right" />
        </div>
      </div>
    );
  }
}
