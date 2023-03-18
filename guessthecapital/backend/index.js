const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("highscores.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQLite database.");
});

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS europeanhighscores (id INTEGER PRIMARY KEY, name TEXT NOT NULL, score INTEGER NOT NULL)"
  );
});
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS asianhighscores (id INTEGER PRIMARY KEY, name TEXT NOT NULL, score INTEGER NOT NULL)"
  );
});

app.get("/api/european/highscores", (req, res) => {
  db.all(
    "SELECT * FROM europeanhighscores ORDER BY score DESC LIMIT 10",
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});
app.get("/api/asian/highscores", (req, res) => {
  db.all(
    "SELECT * FROM asianhighscores ORDER BY score DESC LIMIT 10",
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.json(rows);
    }
  );
});

app.post("/api/european/highscores", (req, res) => {
  const { name, score } = req.body;

  if (typeof name === "string" && typeof score === "number") {
    db.run(
      "INSERT INTO europeanhighscores (name, score) VALUES (?, ?)",
      [name, score],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        res.status(201).json({ message: "Highscore added successfully." });
      }
    );
  } else {
    res.status(400).json({ message: "Invalid request format." });
  }
});

app.post("/api/asian/highscores", (req, res) => {
  const { name, score } = req.body;

  if (typeof name === "string" && typeof score === "number") {
    db.run(
      "INSERT INTO asianhighscores (name, score) VALUES (?, ?)",
      [name, score],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
        res.status(201).json({ message: "Highscore added successfully." });
      }
    );
  } else {
    res.status(400).json({ message: "Invalid request format." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the SQLite database connection.");
  });
  process.exit();
});
