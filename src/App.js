import logo from "./logo.svg";
import "./App.css";
// import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";
import { GameCard } from "./components/game/GameCard";
import { About } from "./components/static/About";

function App() {
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
