import {
  Alignment,
  AnchorButton,
  Button,
  Navbar as BpNavbar,
  Popover
} from "@blueprintjs/core";
import * as React from "react";
import "./Navbar.css";

export class Navbar extends React.Component<{}> {
  public render() {
    return (
      <BpNavbar className="bp3-dark">
        <BpNavbar.Group align={Alignment.LEFT}>
          <BpNavbar.Heading>Widget</BpNavbar.Heading>
          <BpNavbar.Divider />
          <Button
            // onClick={this.handleRepoSelection}
            text="By Repository"
            minimal={true}
          />
          <Button
            // onClick={this.handleUserSelection}
            text="By User"
            minimal={true}
          />
        </BpNavbar.Group>
        {
          <BpNavbar.Group align={Alignment.RIGHT}>
            <Popover className="mobile">
              <Button icon="more" minimal={true} />
              <AnchorButton
                href={`https://github.com/settings/connections/applications/${process.env.REACT_APP_CLIENT_ID}`}
                text="Review/revoke application"
                minimal={true}
              />
            </Popover>
            <AnchorButton
              className="desktop"
              href={`https://github.com/settings/connections/applications/${process.env.REACT_APP_CLIENT_ID}`}
              text="Review/revoke application"
              minimal={true}
            />
          </BpNavbar.Group>
        }
      </BpNavbar>
    );
  }

  // private handleRepoSelection = (_: React.MouseEvent<HTMLElement>) => this.props.history.push("/");
  // private handleUserSelection = (_: React.MouseEvent<HTMLElement>) => this.props.history.push("/user");
}
