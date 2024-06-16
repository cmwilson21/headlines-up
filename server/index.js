const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const proxy = require("express-http-proxy");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const port = 3010;
const userStore = new Map();
userStore.set("bob", { password: "123", score: 0 });

// Open a database handle
let db = new sqlite3.Database(
  "./users.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the users database.");
  }
);

// Create table (if not exists)
db.run(`CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL,
  score INTEGER
)`);

app.use("/proxy", proxy("https://newsapi.org"));

app.post("/login", bodyParser.json(), (req, res, next) => {
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (err, row) => {
      if (err) {
        return next(err);
      }
      if (row && row.password === req.body.password) {
        res.send(200);
      } else {
        res.send(401);
      }
    }
  );
});

app.put("/signup", bodyParser.json(), (req, res, next) => {
  console.log(req.body);
  db.run(
    "INSERT INTO users(username, password, score) VALUES(?, ?, ?)",
    [req.body.username, req.body.password, 0],
    function (err) {
      if (err) {
        next(err);
        return console.log(err.message);
      }
      res.sendStatus(200);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
