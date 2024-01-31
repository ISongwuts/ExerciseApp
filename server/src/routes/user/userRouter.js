const express = require('express');
const db = require('../../database/db');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');

userRouter.delete('/api/user/delete/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const userExists = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM user WHERE user_id = ?", [user_id], (err, result) => {
                if (err) reject(err);
                else resolve(result.length > 0);
            });
        });

        if (userExists) {
            await new Promise((resolve, reject) => {
                db.query("DELETE FROM user WHERE user_id = ?", [user_id], (err, result) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.get('/api/user', async (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const verify = jwt.verify(token, process.env.jwt_secret);
        const result = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM user", (err, result) => {
                if (err) reject(err);
                else resolve(result);const bcrypt = require('bcryptjs');
            });
        });
        res.send(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

userRouter.post('/api/user/register', async (req, res) => {
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

userRouter.post('/api/user/login', async (req, res) => {
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
        const token = jwt.sign({ username, role: 'user' }, process.env.jwt_secret, {expiresIn: '7d'});
        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                birth: user.birth,
                role: user.role,
                token
            }
        });
        console.log('Authentication successful');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = userRouter;