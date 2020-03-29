import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { API_DEFINITION } from "../../graphql/queries";
import {
  ActionDefinition,
  AuthPolicy,
  AuthPolicyType
} from "../../graphql/types";
import { CUSTOMIZE_API } from "../../routes";
import { Arrows } from "../Arrows";
import { SaveCancel } from "../SaveCancel";
import { AuthPolicyForm } from "./auth/AuthPolicyForm";

const SET_AUTH = gql`
  mutation AuthAPI(
    $apiID: ID!
    $read: AuthPolicyInput!
    $update: [UpdateAuthInput!]!
    $delete: AuthPolicyInput!
  ) {
    authAPI(input: { apiID: $apiID, read: $read, delete: $delete })
  }
`;

const DEFAULT_AUTH_POLICY = { type: AuthPolicyType.CreatedBy };

export function AuthAPI() {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const edit = query.get("edit") === "true";
  const history = useHistory();

  const [read, setRead] = useState(DEFAULT_AUTH_POLICY);
  const [update, setUpdate] = useState<Record<string, AuthPolicy>>({});
  const [del, setDel] = useState(DEFAULT_AUTH_POLICY);

  const { loading, data } = useQuery(API_DEFINITION, {
    variables: { id },
    onCompleted: d => {
      if (d && d.api && d.api.operations) {
        if (d.api.operations.read.auth) {
          setRead(d.api.operations.read.auth);
        }
        setUpdate(
          Object.assign(
            {},
            d.api.operations.update.actions.map((action: ActionDefinition) => ({
              [action.name]: action.auth
            }))
          )
        );
        if (d.api.operations.delete.auth) {
          setDel(d.api.operations.delete.auth);
        }
      }
    }
  });
  const [authApi, _] = useMutation(SET_AUTH);

  async function handleSave() {
    await authApi({
      variables: {
        apiID: id,
        read,
        update: Object.entries(update).map(([actionName, auth]) => ({
          actionName,
          auth
        })),
        delete: del
      }
    });
    if (edit) {
      history.goBack();
    } else {
      history.push(CUSTOMIZE_API(id!));
    }
  }

  if (loading || !data) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <h2>Auth API</h2>
      <div>
        {(data.api.operations.read.enabled ||
          data.api.operations.list.enabled) && (
          <div>
            <h3>Read Policy</h3>
            <AuthPolicyForm policy={read} setPolicy={setRead} />
          </div>
        )}

        {data.api.operations.update.enabled &&
          data.api.operations.update.actions.map((action: ActionDefinition) => (
            <div>
              <h3>Update Policy: {action.name}</h3>
              <AuthPolicyForm
                policy={update[action.name] || DEFAULT_AUTH_POLICY}
                setPolicy={policy =>
                  setUpdate({
                    ...update,
                    [action.name]: policy
                  })
                }
              />
            </div>
          ))}

        {data.api.operations.delete.enabled && (
          <div>
            <h3>Delete Policy</h3>
            <AuthPolicyForm policy={del} setPolicy={setDel} />
          </div>
        )}

        {!edit && <Arrows next={handleSave} />}
        {edit && <SaveCancel onSave={handleSave} />}
      </div>
    </div>
  );
}
