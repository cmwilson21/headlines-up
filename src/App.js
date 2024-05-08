import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";
import { GamePageBody } from "./components/game/GamePageBody";
import { About } from "./components/static/About";
import Signup from "./components/sessions/Signup";
import Login from "./components/sessions/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<GamePageBody />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
