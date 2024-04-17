// app.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/trashcans', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM trash_location'); // 테이블 이름 수정
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
