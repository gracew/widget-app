import { Button, Collapse, FormGroup, InputGroup } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./CreateObject.css";

interface ICollapseState {
  isOpen: boolean;
}

// TODO(gracew): would be nice to substitute the name of the API
export class CreateObject extends React.Component<{}, ICollapseState> {
  public state: ICollapseState = { isOpen: true };

  public render() {
    const createText =
      'curl -XPOST http://localhost:8080/apis/deployId -H "Content-type: application/json" -d \'{"foo": "bar"}\'';

    return (
      <div>
        <Button className="expand" minimal={true} onClick={this.handleClick}>
          <h3>Create an object</h3>
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <FormGroup label="Field1">
            <InputGroup placeholder="placeholder" />
          </FormGroup>
          <FormGroup label="Field1">
            <InputGroup placeholder="placeholder" />
          </FormGroup>
          <Button icon="play" text="Run" intent="primary" />
          <Button icon="duplicate" text="Copy cURL" />
          <MonacoEditor
            width="800"
            height="30"
            theme="vs-dark"
            value="output"
          />
        </Collapse>
      </div>
    );
  }

  private handleClick = () => this.setState({ isOpen: !this.state.isOpen });
}
