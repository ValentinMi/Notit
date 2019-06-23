import React from "react";
import { NavLink } from "react-router-dom";
import NoteCell from "./commons/noteCell";
import "../styles/topMenu.css";
import "../styles/notingContainer.css";

const TopMenu = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light top-menu">
      <NavLink className="navbar-brand" to="/home">
        {user ? (
          <NoteCell color="vgd-day userCell" />
        ) : (
          <NoteCell color="vbad-day userCell" />
        )}
        Notit
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopMenu;
