const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config()

const app = express();
const PORT = '3001';
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = mysql.createConnection({
    user: process.env.user,
    host: process.env.host,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});

app.get('/api/user', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT user_id, username, email, birth, role FROM user", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        res.send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/post/rowcount', async (req, res) => {
    const { query: { category, value } } = req;
    console.log(req.query);
    try {
        if (!category && !value) {
            const result = await new Promise((resolve, reject) => {
                db.query('SELECT COUNT(*) AS row_count FROM post', (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            const rowCount = result[0].row_count;
            return res.send({ rowCount });
        }

        if (category && value) {
            const result = await new Promise((resolve, reject) => {
                const query = `SELECT COUNT(*) AS row_count FROM post WHERE category_id = ${value}`;
                const values = [category, value];
                db.query(query, values, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });

            const rowCount = result[0].row_count;
            return res.send({ rowCount });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/post', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM post", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        res.send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/post/latestPostID', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT post_id FROM post ORDER BY CAST(SUBSTRING(post_id, 6) AS UNSIGNED) DESC LIMIT 1", (err, result) => {
                if (err) reject(err);
                else resolve(result[0] ? result[0].post_id : null);
            });
        });
        res.send({ latestPostID: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/post/page=:id', async (req, res) => {
    try {
        const page = parseInt(req.params.id, 10);
        const pageSize = 8;
        const offset = (page - 1) * pageSize;
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM post LIMIT ? OFFSET ?", [pageSize, offset], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        res.send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/post/category=:id', async (req, res) => {
    const categoryId = req.params.id;

    try {
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM post WHERE category_id = ?", [categoryId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        res.send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/api/category', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM category", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        res.send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/upload', async (req, res) => {
    // Handle the upload logic here
    console.log('Received a POST request to /api/upload');
    console.log(req.body);

    try {
        const postData = req.body; // Extract data from the request body
        const insertQuery = 'INSERT INTO post (post_id, post_title, post_desc, post_article, post_feedback, post_date, post_author, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        // Execute the SQL query with the extracted data
        db.query(insertQuery, [postData.id, postData.title, postData.description, postData.content, 0, postData.date, postData.author, postData.category], (error, result) => {
            if (error) {
                console.error(error.message);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('Data inserted successfully');
                res.status(200).json({ message: 'Upload successful' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/user/register', async (req, res) => {
    // Handle the upload logic here
    console.log('Received a POST request to /api/user/register');
    console.log(req.body);

    try {
        const userData = req.body; // Extract data from the request body
        const insertQuery = 'INSERT INTO user (username, password, email, birth, role) VALUES (?, ?, ?, ?, ?)';

        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        db.query(insertQuery, [userData.username, hashedPassword, userData.email, userData.birth, userData.role], (error, result) => {
            if (error) {
                console.error(error.message);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('Data inserted successfully');
                res.status(200).json({ message: 'Upload successful' });
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/user/login', async (req, res) => {
    console.log('Received a POST request to /api/user/login');
    console.log(req.body);

    try {
        const { username, password } = req.body;
        const user = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE username = ?", [username], (err, result) => {
                if (err) reject(err);
                else resolve(result[0]);
            });
        });

        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
            return;
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            res.status(401).json({ message: 'Authentication failed. Invalid password.' });
            return;
        }

        // If authentication is successful, include user data in the response
        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                birth: user.birth,
                role: user.role,
                // Include other relevant user information
            }
        });
        console.log('Authentication successful');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(PORT, () => console.log("Server is running on port: " + PORT))
module.exports = app;