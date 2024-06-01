const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

//로그인 요청 엔드포인트
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // 사용자 확인
        const [users] = await pool.query('SELECT * FROM trash_users WHERE username = ? AND password = ?', [username, password]);
        if (users.length === 0) {
            return res.status(401).json({ message: '사용자 이름 또는 비밀번호가 잘못되었습니다.' });
        }

        // 로그인 성공
        res.status(200).json({ message: '로그인 성공', user: users[0] });
    } catch (err) {
        console.error('로그인 처리 중 오류 발생:', err);
        res.status(500).json({ message: '서버 오류 발생', error: err.message });
    }
});

//회원가입 요청 엔드포인트
app.post('/api/signup', async (req, res) => {
    const { username, password, name, birthdate, phone, email } = req.body;
    try {
        // 사용자가 이미 존재하는지 확인
        const [existingUsers] = await pool.query('SELECT * FROM trash_users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
        }

        // 새로운 사용자 생성
        const sql = 'INSERT INTO trash_users (id, username, password, name, birthdate, phone, email) VALUES (NULL, ?, ?, ?, ?, ?, ?)';
        await pool.query(sql, [username, password, name, birthdate, phone, email]);

        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (err) {
        console.error('회원가입 처리 중 오류 발생:', err);
        res.status(500).json({ message: '서버 오류 발생', error: err.message });
    }
});


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

// 새로운 위치 데이터셋을 조회하는 엔드포인트
app.post('/api/newtrashlocations', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM new_trash_locations');
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