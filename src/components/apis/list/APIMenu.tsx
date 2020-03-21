import { useMutation } from "@apollo/react-hooks";
import { Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { gql } from "apollo-boost";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  AUTH_API,
  CUSTOMIZE_API,
  EDIT_FIELDS,
  EDIT_OPERATIONS
} from "../../../routes";
import { ALL_APIS } from "../ListAPIs";

const DELETE_API = gql`
  mutation DeleteAPI($id: ID!) {
    deleteAPI(id: $id)
  }
`;

interface APIMenuProps {
  id: string;
}

export function APIMenu({ id }: APIMenuProps) {
  const history = useHistory();

  const [deleteApi, _] = useMutation(DELETE_API, {
    update(cache, {}) {
      const cachedRes: any = cache.readQuery({ query: ALL_APIS });
      const apis = (cachedRes && cachedRes.apis) || [];
      cache.writeQuery({
        query: ALL_APIS,
        data: { apis: apis.filter((a: any) => a.id !== id) }
      });
    }
  });

  return (
    <Menu>
      <MenuItem
        icon="edit"
        text="Edit Fields"
        onClick={() => history.push(EDIT_FIELDS(id!))}
      />
      <MenuItem
        icon="globe-network"
        text="Edit Operations"
        onClick={() => history.push(EDIT_OPERATIONS(id!) + "?edit=true")}
      />
      <MenuItem
        icon="lock"
        text="Authorize"
        onClick={() => history.push(AUTH_API(id!) + "?edit=true")}
      />
      <MenuItem
        icon="code"
        text="Customize"
        onClick={() => history.push(CUSTOMIZE_API(id!) + "?edit=true")}
      />
      <MenuDivider />
      <MenuItem
        icon="trash"
        text="Delete"
        intent="danger"
        onClick={() => deleteApi({ variables: { id } })}
      />
    </Menu>
  );
}
