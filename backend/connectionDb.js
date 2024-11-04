// connectionDb.js
const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (creates a new file if it doesn't exist)
const db = new sqlite3.Database('./foodrecipe.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

module.exports = db;
