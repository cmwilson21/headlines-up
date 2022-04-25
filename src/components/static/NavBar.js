import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul className="nav-ul">
        <li className="nav-li">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/login">Login</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/play">Play</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
