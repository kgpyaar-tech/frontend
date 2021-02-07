import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

import logo from "../images/logo.svg";

export default function Navbar() {
  let auth = useAuth();

  return (
    <nav>
      <div className="wrapper">
        <img src={logo} alt="KGPyaar logo" />
        <ul>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          { auth?.user ? (
            <React.Fragment>
              <li>
                <NavLink exact to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li onClick={ () => auth?.signout(() => console.log("User signed out"))}>
                Signout
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink exact to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/register">
                  Register
                </NavLink>
              </li>
          </React.Fragment>
          ) }
        </ul>
      </div>
    </nav>
  );
}
