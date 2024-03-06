const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'offers'
});

// Connect to the database
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Get all Office Workers
app.get('/office-workers', (req, res) => {
  connection.query('SELECT * FROM OfficeWorkers', (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ data: results });
  });
});

// Get a single Office Worker by ID
app.get('/office-workers/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM OfficeWorkers WHERE id = ?', [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ data: results });
  });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
