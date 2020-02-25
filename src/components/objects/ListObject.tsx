import { Button, Collapse, HTMLSelect, InputGroup } from "@blueprintjs/core";
import React from "react";
import MonacoEditor from "react-monaco-editor";
import "./CreateObject.css";

interface IListObjectProps {
  definition: any;
}

interface ICreateObjectState {
  isOpen: boolean;
}

// TODO(gracew): would be nice to substitute the name of the API
export class ListObject extends React.Component<
  IListObjectProps,
  ICreateObjectState
> {
  public state: ICreateObjectState = { isOpen: true };

  public render() {
    const includeList = this.props.definition.operations.find(
      (el: any) => el.type === "LIST"
    );
    if (!includeList) {
      return <div></div>;
    }
    return (
      <div>
        <Button className="expand" minimal={true} onClick={this.handleClick}>
          <h3>List object</h3>
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          {includeList.sort && includeList.sort.length > 0 && (
            <div>
              Sort by:
              <HTMLSelect id="sort">
                {includeList.map(
                  ({ field, order }: { field: string; order: string }) => (
                    <option value={field + order}>
                      {field} {order}
                    </option>
                  )
                )}
              </HTMLSelect>
            </div>
          )}
          <div>
            Filter by:
            <HTMLSelect id="filter">
              {includeList.filter.map((name: string) => (
                <option value={name}>{name}</option>
              ))}
            </HTMLSelect>
            <InputGroup />
          </div>
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
