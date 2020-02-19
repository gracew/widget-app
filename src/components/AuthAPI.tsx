import { Button, Radio, RadioGroup } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

// TODO(gracew): would be nice to substitute the name of the API
export class AuthAPI extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>Set an authorization policy</h2>
        <RadioGroup onChange={this.onChange}>
          <Radio label="Objects are only " value="foo" />
        </RadioGroup>
        Great! Let's publish the API to a sandbox and try calling it.
        <div className="arrows">
          <Button icon="arrow-left" />
          <Button rightIcon="arrow-right" onClick={this.handleNext} />
        </div>
      </div>
    );
  }

  private onChange = () => {};
  private handleNext = () => this.props.history.push("/try");
}
