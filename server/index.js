require("dotenv").config();
const crypto = require("crypto");

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
const apiKey = process.env.REACT_APP_API_KEY;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "..", "build")));

// Get the directory of the current file (index.js)
const currentDir = __dirname;

// Get the parent directory (one level above index.js)
const parentDir = path.resolve(currentDir, "..");

console.log("Current Directory:", currentDir);
console.log("Parent Directory:", parentDir);

console.log(process.env);

console.log(apiKey);

// Open a database handle
let db = new sqlite3.Database(
  // "./users.db",
  path.join(parentDir, "users.db"), // Use the parent directory for the database
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
  validAfter INTEGER DEFAULT 0
)`);

// create table of guessed articles that includes a user id and the article hash
db.run(`CREATE TABLE IF NOT EXISTS guessedArticles (
  userId TEXT NOT NULL,
  articleHash TEXT NOT NULL,
  correctGuess INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (userId, articleHash),
  FOREIGN KEY (userId) REFERENCES users(username),
  FOREIGN KEY (articleHash) REFERENCES articles(hash)
)`);

db.run(
  `CREATE INDEX IF NOT EXISTS idx_guessedArticles_userId_correctGuess ON guessedArticles(userId, correctGuess);`
);

// TODO: create an index for guessed articles to display % of right answers

db.run(`CREATE TABLE IF NOT EXISTS articles (
  hash TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  description TEXT NOT NULL,
  publishedAt TEXT NOT NULL, 
  url TEXT NOT NULL,
  urlToImage TEXT NOT NULL
)`);

db.run(
  `CREATE INDEX IF NOT EXISTS idx_publishedAt ON articles (publishedAt DESC)`
);

updateArticles();
setInterval(updateArticles, 1000 * 60 * 60 * 6); // Update articles every six hour

async function updateArticles() {
  try {
    await fetch(
      `https://newsapi.org/v2/top-headlines?sources=bbc-news,fox-news,reuters,associated-press,cnn&apikey=${apiKey}&page=0`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch news sources");
          // may want to handle this differently later
        }
      })
      .then((data) => {
        if (data && data.articles) {
          data.articles.forEach((article) => {
            const hash = crypto.createHash("sha256");
            hash.update(
              article.description + article.title + article.publishedAt
            );
            const articleHash = hash.digest("hex");
            db.run(
              `INSERT OR IGNORE INTO articles (hash, title, source, description, publishedAt, url, urlToImage) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                articleHash,
                article.title,
                article.source.id,
                article.source.description || "",
                article.publishedAt || new Date().toISOString(),
                article.url,
                article.urlToImage || "",
              ],
              (err) => {
                if (err) {
                  console.error("Error inserting article:", err.message);
                }
              }
            );
          });
        }
      });
  } catch (error) {
    console.error("Error updating articles:", error);
  }
}

// Debugging
db.all("SELECT * FROM articles", (err, rows) => {
  // console.log("rows", rows);
  console.log(rows.length, "articles in the database");
});

// app.use("/proxy", proxy("https://newsapi.org"));

app.get("/articles", auth, (req, res, next) => {
  const page = parseInt(req.query.page) || 0; // Default to page 0
  const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 results per page
  const offset = page * pageSize;

  // const query = `SELECT * FROM articles ORDER BY publishedAt DESC LIMIT ? OFFSET ?`;
  const query = `SELECT hash, title, description, publishedAt, url, urlToImage FROM articles WHERE hash NOT IN (SELECT articleHash FROM guessedArticles WHERE userId = ?) ORDER BY publishedAt DESC LIMIT ? OFFSET ?`;
  db.all(query, [req.username, pageSize, offset], (err, rows) => {
    if (err) {
      return next(err);
    } else {
      res.json({ articles: rows });
    }
  });
});

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
          res.json({ jwt: token, username: row.username });
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
            "INSERT INTO users(username, password) VALUES(?, ?)",
            [req.body.username, hash],
            function (err) {
              if (err) {
                next(err);
                return console.log(err.message);
              }
              const token = jwt.sign(
                { username: req.body.username },
                secretKey
              );
              res.json({ jwt: token, username: req.body.username });
            }
          );
        });
      }
    }
  );
});

app.post("/user/password", auth, bodyParser.json(), (req, res, next) => {
  if (!req.username) {
    return res.send(401);
  }
  bcrypt.hash(req.body.password, 11, function (err, hash) {
    db.run(
      "UPDATE users SET validAfter = ?, password = ? WHERE username = ?",
      [Date.now(), hash, req.username],
      function (err) {
        if (err) {
          next(err);
          return console.log(err.message);
        }
        res.send(200);
      }
    );
  });
});

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      res.sendStatus(401);
    } else {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [decoded.username],
        (err, row) => {
          if (err || !row) {
            return next(err);
          } else {
            console.log("decoded", decoded);
            if (decoded.iat < row.validAfter) {
              console.log("decoded after", row.validAfter);
              return res.sendStatus(401);
            }
            req.username = decoded.username;
            next();
          }
        }
      );
    }
  });
}

app.post("/user/guess", auth, bodyParser.json(), (req, res, next) => {
  if (!req.username) {
    return res.send(401);
  }
  const articleHash = req.body.articleHash;

  db.get("SELECT * FROM articles WHERE hash = ?", [articleHash], (err, row) => {
    if (err) {
      next(err);
      return console.log(err.message);
    }
    if (!row) {
      return res.status(404).send("Article not found");
    }
    const isCorrect = row.source === req.body.selection;
    console.log("isCorrect", isCorrect);
    db.run(
      "INSERT OR REPLACE INTO guessedArticles (userId, articleHash, correctGuess) VALUES (?, ?, ?)",
      [req.username, articleHash, isCorrect],
      function (err) {
        if (err) {
          next(err);
          return console.log(err.message);
        }
        res.json({ ok: true, correctGuess: isCorrect, source: row.source });
      }
    );
  });
});

app.get("/user/score", auth, (req, res, next) => {
  if (!req.username) {
    return res.send(401);
  }
  db.get(
    "SELECT SUM(correctGuess) AS score FROM guessedArticles WHERE correctGuess = 1 AND userId = ?",
    [req.username],
    (err, row) => {
      if (err) {
        next(err);
        return console.log(err.message);
      }
      console.log("row", row);
      res.json({ score: row.score });
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
