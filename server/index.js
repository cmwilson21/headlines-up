require("dotenv").config();

const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const proxy = require("express-http-proxy");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const app = express();
const port = +process.argv[2] || 3010;
const secretKey = process.env.JWT_SECRET_KEY;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "..", "build")));

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
      if (err || !row) {
        return next(err);
      }
      bcrypt.compare(req.body.password, row.password, function (err, result) {
        if (err) {
          return next(err);
        }
        if (result === true) {
          const token = jwt.sign({ username: row.username }, secretKey);
          res.json({ jwt: token, score: row.score, username: row.username });
        } else {
          res.send(401);
        }
      });
    }
  );
});

app.put("/signup", bodyParser.json(), (req, res, next) => {
  console.log(req.body);
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (err, row) => {
      if (err) {
        next(err);
        return console.log(err.message);
      }
      if (row) {
        res.status(400).send("Username already taken");
      } else {
        bcrypt.hash(req.body.password, 11, function (err, hash) {
          console.log({ hash });
          db.run(
            "INSERT INTO users(username, password, score) VALUES(?, ?, ?)",
            [req.body.username, hash, 0],
            function (err) {
              if (err) {
                next(err);
                return console.log(err.message);
              }
              const token = jwt.sign(
                { username: req.body.username },
                secretKey
              );
              res.json({ jwt: token, score: 0, username: req.body.username });
            }
          );
        });
      }
    }
  );
});

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      res.sendStatus(401);
    } else {
      console.log("decoded", decoded);
      req.username = decoded.username;
      next();
    }
  });
}

app.post("/user/score", auth, bodyParser.json(), (req, res, next) => {
  if (!req.username) {
    return res.send(401);
  }
  db.run(
    "UPDATE users SET score = ? WHERE username = ?",
    [req.body.score, req.username],
    function (err) {
      if (err) {
        next(err);
        return console.log(err.message);
      }
      res.send(200);
    }
  );
});

// Anything that doesn't match the above, send back the index.html file - a fallback to cover any path outside of our routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/build/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
