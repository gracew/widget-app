import { Button, Collapse, FormGroup, InputGroup } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./CreateObject.css";

interface ICreateObjectProps {
  // TODO(gracew): type/generate this
  definition: any;
}

interface ICreateObjectState {
  isOpen: boolean;
}

// TODO(gracew): would be nice to substitute the name of the API
export class ReadObject extends React.Component<
  ICreateObjectProps,
  ICreateObjectState
> {
  public state: ICreateObjectState = { isOpen: true };

  public render() {
    const show =
      this.props.definition.operations.length === 0 ||
      this.props.definition.operations.includes("READ");
    if (!show) {
      return <div></div>;
    }
    return (
      <div>
        <Button className="expand" minimal={true} onClick={this.handleClick}>
          <h3>Read an object</h3>
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <FormGroup label="id">
            <InputGroup />
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
