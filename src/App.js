import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";
import { GameCard } from "./components/game/GameCard";
import { About } from "./components/static/About";
import Signup from "./components/sessions/Signup";
import Login from "./components/sessions/Login";
// import { apiUrl } from "./Globals";
// import { useDispatch, useSelector } from "react-redux";
// import { loadArticle } from "./actions/articleAction";

function App() {
  // const dispatch = useDispatch();
  // const article = useSelector((state) => state.articles);
  // const requesting = useSelector((state) => state.requesting);

  // useEffect(() => {
  //   dispatch(loadArticle());
  // }, []);
  // console.log("articles", article);

  //      {/* <Route path="/signup" element={<Home />} /> */}
  //      {/* <Route path="/login" element={<Home />} /> */}
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<GameCard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
