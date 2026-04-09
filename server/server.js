const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 8080;
const JWT_SECRET = '5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437';

app.use(cors());
app.use(express.json());

// Database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'smartcitydb'
};

let db;

async function initializeDatabase() {
    try {
        db = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });

        // Ensure database exists
        await db.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        await db.query(`USE ${dbConfig.database}`);

        // Create Users table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);

        // Bootstrap Admin User
        const adminEmail = 'admin@smartcity.com';
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [adminEmail]);
        
        if (rows.length === 0) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
                ['System Admin', adminEmail, hashedPassword]);
            console.log('>>> Admin account created: admin@smartcity.com / admin123');
        }

        console.log('>>> Connected to MySQL and Database is ready.');
    } catch (err) {
        console.error('!!! MySQL Connection Error: ', err.message);
        process.exit(1);
    }
}

// --- Auth Endpoints ---

// Register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).send("Email is already registered!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword]);
        
        res.status(201).send("User registered successfully!");
    } catch (err) {
        res.status(500).send("Server error during registration");
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).send("Invalid credentials");
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ accessToken: token });
    } catch (err) {
        res.status(500).send("Server error during login");
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.send("Backend (Node.js) is running and accessible!");
});

// Start Server
app.listen(PORT, async () => {
    await initializeDatabase();
    console.log(`>>> Minimal Node.js Backend listening on port ${PORT}`);
});
