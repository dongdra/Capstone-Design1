const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// 기존 휴지통 위치 데이터를 조회하는 엔드포인트 
app.post('/api/trashcans', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM trash_location');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// 새로운 공지 사항을 추가하는 엔드포인트
app.post('/api/complaints', async (req, res) => {
    const { title, content } = req.body;
    try {
        const sql = 'INSERT INTO complain_table (title, content) VALUES (?, ?)';
        const [result] = await pool.query(sql, [title, content]);
        res.status(201).json({ message: 'Complaint added successfully', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// 모든 공지 사항을 조회하는 엔드포인트
app.post('/api/complaints/all', async (req, res) => {
    try {
        const sql = 'SELECT * FROM complain_table ORDER BY id DESC';
        const [rows] = await pool.query(sql);
        res.json(rows); // JavaScript 객체를 JSON 형식으로 변환하여 클라이언트로 전송
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
