import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/sessionsAction";

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

const UserNavBar = ({ username, score }) => {
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    await dispatch(logout());
  }
  return (
    <div className="navbar">
      <ul className="nav-ul">
        <li className="nav-li">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/play">Play</NavLink>
        </li>
        <li className="nav-li">
          <NavLink to="/about">About</NavLink>
        </li>
        <li>Hi {username}! </li>
        <li>Score: {score}</li>
        <li className="nav-li" onClick={handleSubmit}>
          <NavLink to="/">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
};

const NavBar = () => {
  const { loggedIn, username, score } = useSelector((state) => state.auth);
  console.log(username);
  if (!loggedIn) {
    return <GuestNavBar />;
  }

  return <UserNavBar username={username} score={score} />;
};

export default NavBar;
