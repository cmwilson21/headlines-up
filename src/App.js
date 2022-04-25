import logo from "./logo.svg";
import "./App.css";
import { React, useState, useEffect } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";
import { GameCard } from "./components/game/GameCard";
import { About } from "./components/static/About";
// import { API_KEY } from "./Globals";
import { apiUrl } from "./Globals";

function App() {
  const [articles, setArticles] = useState([]);
  // const apiUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news,fox-news,reuters,associated-press,cnn&apiKey=${API_KEY}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.log(error));
  }, []);
  console.log(articles.articles);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<Home />} /> */}
          {/* <Route path="/login" element={<Home />} /> */}
          <Route path="/play" element={<GameCard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
