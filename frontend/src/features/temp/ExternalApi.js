import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { callApi } from "../../api/ExternalApi";
import { getUser } from "../../api/User";

export const ExternalApi = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  let token = null;
  getAccessTokenSilently()
    .then((t) => {
      token = t;
    })
    .catch(() => {});
  return (
    <div className="container">
      <h1>External API</h1>
      <p>
        Use these buttons to call an external API. The protected API call has an
        access token in its authorization header. The API server will validate
        the access token using the Auth0 Audience value.
      </p>
      <div
        className="btn-group mt-5"
        role="group"
        aria-label="External API Requests Examples"
      >
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Get Public Message
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => getUser(user, token)}
        >
          Get Protected Message
        </button>
      </div>
    </div>
  );
};
