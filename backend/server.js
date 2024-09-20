const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'member_management',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// API Routes
app.post('/members', (req, res) => {
    const { prefix, first_name, last_name, birth_date, profile_image } = req.body;
    const query = 'INSERT INTO members (prefix, first_name, last_name, birth_date, profile_image) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [prefix, first_name, last_name, birth_date, profile_image], (err, result) => {
        if (err) throw err;
        res.send('Member added...');
    });
});

app.get('/members', (req, res) => {
    const query = 'SELECT *, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age FROM members';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/members/:id', (req, res) => {
    const { id } = req.params;
    const { prefix, first_name, last_name, birth_date, profile_image } = req.body;
    const query = 'UPDATE members SET prefix = ?, first_name = ?, last_name = ?, birth_date = ?, profile_image = ? WHERE id = ?';
    db.query(query, [prefix, first_name, last_name, birth_date, profile_image, id], (err, result) => {
        if (err) throw err;
        res.send('Member updated...');
    });
});

app.delete('/members/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM members WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('Member deleted...');
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});