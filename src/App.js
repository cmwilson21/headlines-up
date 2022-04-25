import logo from "./logo.svg";
import "./App.css";
// import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/static/Home";
import NavBar from "./components/static/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
