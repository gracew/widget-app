import { HTMLSelect } from "@blueprintjs/core";
import React from "react";
import { useParams } from "react-router-dom";
import { Arrows } from "./Arrows";

export function AuthAPI() {
  const { id } = useParams();

  return (
    <div>
      <h2>Auth API</h2>
      <div>
        <h3>Read Policy</h3>
        <HTMLSelect>
          <option value="created-by">
            Allow for objects created by the user
          </option>
          <option value="attribute-match">
            Allow when object attribute matches user attribute
          </option>
          <option value="custom">Custom</option>
        </HTMLSelect>

        <h3>Write Policy</h3>
        <HTMLSelect>
          <option value="read-policy">Use read policy</option>
          <option value="custom">Custom</option>
        </HTMLSelect>
        <Arrows />
      </div>
    </div>
  );
}
