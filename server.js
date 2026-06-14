const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

// Connect to database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT NOT NULL
    )
`);

// ======================
// READ - Get all tasks
// ======================
app.get('/tasks/filter', (req, res) => {

    const startDate = req.query.start;
    const endDate = req.query.end;

    db.all(
        'SELECT * FROM tasks WHERE created_at BETWEEN ? AND ?',
        [startDate, endDate],
        (err, rows) => {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json(rows);
            }
        }
    );
});

// ======================
// CREATE - Add task
// ======================
app.post('/tasks', (req, res) => {

    const { name } = req.body;

    const created_at = new Date().toISOString().split('T')[0];

    db.run(
        'INSERT INTO tasks (name, created_at) VALUES (?, ?)',
        [name, created_at],
        function (err) {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    id: this.lastID,
                    name,
                    created_at
                });
            }
        }
    );
});
// ======================
// UPDATE - Edit task
// ======================
app.put('/tasks/:id', (req, res) => {

    const { name } = req.body;
    const id = req.params.id;

    db.run(
        'UPDATE tasks SET name = ? WHERE id = ?',
        [name, id],
        function (err) {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    message: 'Task updated successfully'
                });
            }
        }
    );
});

// ======================
// DELETE - Remove task
// ======================
app.delete('/tasks/:id', (req, res) => {

    const id = req.params.id;

    db.run(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        function (err) {

            if (err) {
                res.status(500).json(err);
            } else {
                res.json({
                    message: 'Task deleted successfully'
                });
            }
        }
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});