import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const GuestNavBar = () => {
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

const NavBar = () => {
  const { loggedIn, username } = useSelector((state) => state.auth);
  console.log(username);
  if (!loggedIn) {
    return <GuestNavBar />;
  }

  return <div>"test"</div>;
};

export default NavBar;
