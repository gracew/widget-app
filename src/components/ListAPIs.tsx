import { useQuery } from "@apollo/react-hooks";
import { HTMLTable, Icon } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";

const ALL_APIS = gql`
  {
    apis {
      id
      name
    }
  }
`;

export function ListAPIs() {
  const { loading, error, data } = useQuery(ALL_APIS);
  // TODO(gracew): handle loading/error states better
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      <h2>All APIs</h2>
      <HTMLTable striped={true}>
        <thead>
          <tr>
            <th>API</th>
            <th>Sandbox</th>
            <th>Production</th>
          </tr>
        </thead>
        <tbody>
          {data.apis.map(({ name }: { name: string }) => (
            <tr>
              <td>{name}</td>
              <td>
                <Icon icon="tick-circle" intent="success" />
              </td>
              <td>
                <Icon icon="tick-circle" intent="primary" />
              </td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  );
}
