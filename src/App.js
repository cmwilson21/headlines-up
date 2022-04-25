import logo from "./logo.svg";
import "./App.css";
import { React, useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";
import { GameCard } from "./components/game/GameCard";
import { About } from "./components/static/About";
import { apiUrl } from "./Globals";
import { useDispatch, useSelector } from "react-redux";
import { loadArticle } from "./actions/articleAction";
import Signup from "./components/sessions/Signup";
import Login from "./components/sessions/Login";

function App() {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articles);
  const requesting = useSelector((state) => state.requesting);

  useEffect(() => {
    dispatch(loadArticle());
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/play" element={<GameCard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
