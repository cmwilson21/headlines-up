import logo from "./logo.svg";
import "./App.css";
// import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/sessions/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
