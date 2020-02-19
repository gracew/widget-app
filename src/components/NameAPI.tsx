import { Button, InputGroup } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

export class NameAPI extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>What kind of API are you making?</h2>
        <InputGroup placeholder="e.g. comments, posts"></InputGroup>

        <div className="arrows">
          <Button icon="arrow-left" />
          <Button rightIcon="arrow-right" onClick={this.handleNext} />
        </div>
      </div>
    );
  }

  private handleNext = () => this.props.history.push("/define");
}
