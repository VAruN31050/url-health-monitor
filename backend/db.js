// SQLite setup for logging URL check results
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'url_checks.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS url_checks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT NOT NULL,
    status TEXT NOT NULL,
    responseTime INTEGER,
    checkedAt TEXT NOT NULL
  )`);
});

function logUrlCheck({ url, status, responseTime, checkedAt }) {
  db.run(
    `INSERT INTO url_checks (url, status, responseTime, checkedAt) VALUES (?, ?, ?, ?)`,
    [url, status, responseTime, checkedAt]
  );
}

module.exports = {
  db,
  logUrlCheck,
};
