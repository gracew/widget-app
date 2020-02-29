import { Alignment, Button, Navbar as BpNavbar } from "@blueprintjs/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { LIST_APIS, TESTS } from "../routes";

export function Navbar() {
  const history = useHistory();
  return (
    <BpNavbar className="bp3-dark">
      <BpNavbar.Group align={Alignment.LEFT}>
        <BpNavbar.Heading>Widget</BpNavbar.Heading>
        <BpNavbar.Divider />
        <Button
          onClick={() => history.push(LIST_APIS)}
          text="APIs"
          minimal={true}
        />
        <Button
          onClick={() => history.push(TESTS)}
          text="Tests"
          minimal={true}
        />
      </BpNavbar.Group>
    </BpNavbar>
  );
}
