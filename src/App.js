// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";
import { GamePageBody } from "./components/game/GamePageBody";
import { About } from "./components/static/About";
import { useDispatch } from "react-redux";
import { fetchScore } from "./actions/sessionsAction";
import Signup from "./components/sessions/Signup";
import Login from "./components/sessions/Login";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("focus", () => {
      dispatch(fetchScore());
    });
    dispatch(fetchScore());
  });

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/play" element={<GamePageBody />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
