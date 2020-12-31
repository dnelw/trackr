import React from "react";

import { Breadcrumb } from "antd";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Breadcrumb className="nav-container">
      {isAuthenticated ? (
        <>
          <Breadcrumb.Item>
            <a href="/weight">Weight Trackr</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/habits">Habits Trackr</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={logout}>
            <button onClick={logout} className="link-button">
              Logout
            </button>
          </Breadcrumb.Item>
        </>
      ) : (
        <>
          <Breadcrumb.Item>
            <button
              onClick={() => loginWithRedirect({ screen_hint: "signup" })}
              className="link-button"
            >
              Signup
            </button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <button onClick={loginWithRedirect} className="link-button">
              Login
            </button>
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
};

export default NavBar;
