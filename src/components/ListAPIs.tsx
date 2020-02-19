import { Icon } from "@blueprintjs/core";
import React from "react";
import { RouteComponentProps } from "react-router-dom";

export class ListAPIs extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <table className="bp3-html-table">
        <thead>
          <tr>
            <th>API</th>
            <th>Sandbox</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Posts</td>
            <td><Icon icon="tick-circle" intent="success" /></td>
            <td><Icon icon="tick-circle" intent="primary" /></td>
          </tr>
          <tr>
            <td>Comments</td>
            <td><Icon icon="tick-circle" intent="success" /></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    );
  }
}
