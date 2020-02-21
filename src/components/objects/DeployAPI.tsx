import { Button, Collapse } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useParams } from "react-router-dom";

interface ICollapseState {
  isOpen: boolean;
}

// TODO(gracew): would be nice to substitute the name of the API
export class CreateObject extends React.Component<{}, ICollapseState> {
  public render() {
    const { id } = useParams();

    const createText =
      'curl -XPOST http://localhost:8080/apis/deployId -H "Content-type: application/json" -d \'{"foo": "bar"}\'';

    return (
      <div>
        <Button onClick={this.handleClick}>Create an object</Button>
        <Collapse isOpen={this.state.isOpen}>
          <MonacoEditor
            width="800"
            height="30"
            theme="vs-dark"
            value={createText}
          />
        </Collapse>
      </div>
    );
  }

  private handleClick = () => this.setState({ isOpen: !this.state.isOpen });
}
