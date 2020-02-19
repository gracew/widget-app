import { Button, FileInput } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import { RouteComponentProps } from "react-router-dom";
import "./DefineAPI.css";

export class DefineAPI extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div>
        <h2>Define your API</h2>
        <MonacoEditor
          width="800"
          height="600"
          theme="vs-dark"
          value="hello world!"
        />
        <div className="upload-api">
          <p>Upload a file instead</p>
          <FileInput text="Choose file..." />
        </div>
        <div className="arrows">
          <Button icon="arrow-left" />
          <Button rightIcon="arrow-right" onClick={this.handleNext} />
        </div>
      </div>
    );
  }

  private handleNext = () => this.props.history.push("/auth");
}
