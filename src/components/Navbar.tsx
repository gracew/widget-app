import { Alignment, Button, Navbar as BpNavbar } from "@blueprintjs/core";
import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

export class Navbar extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <BpNavbar className="bp3-dark">
        <BpNavbar.Group align={Alignment.LEFT}>
          <BpNavbar.Heading>Widget</BpNavbar.Heading>
          <BpNavbar.Divider />
          <Button
            onClick={this.handleAllSelection}
            text="My APIs"
            minimal={true}
          />
          <Button
            onClick={this.handleNewSelection}
            icon="add"
            text="New API"
            minimal={true}
          />
        </BpNavbar.Group>
      </BpNavbar>
    );
  }

  private handleAllSelection = (_: React.MouseEvent<HTMLElement>) =>
    this.props.history.push("/all");
  private handleNewSelection = (_: React.MouseEvent<HTMLElement>) =>
    this.props.history.push("/new");
}
