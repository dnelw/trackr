import React from "react";

import { Breadcrumb } from "antd";
import {
  HomeOutlined,
  RedoOutlined,
  TabletOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Breadcrumb className="nav-container">
      {isAuthenticated ? (
        <>
          <Breadcrumb.Item>
            <HomeOutlined />
            <NavLink to="/">Home</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <TabletOutlined />
            <NavLink to="/weight">Weight Trackr</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <RedoOutlined />
            <NavLink to="/habits">Habits Trackr</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserDeleteOutlined />
            <button
              onClick={() =>
                logout({
                  returnTo: window.location.origin,
                })
              }
              className="link-button"
            >
              Logout
            </button>
          </Breadcrumb.Item>
        </>
      ) : (
        <>
          <Breadcrumb.Item>
            <UserAddOutlined />
            <button
              onClick={() => loginWithRedirect({ screen_hint: "signup" })}
              className="link-button"
            >
              Signup
            </button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <button onClick={loginWithRedirect} className="link-button">
              Login
            </button>
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
};
