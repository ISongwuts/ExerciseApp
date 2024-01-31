const express = require('express');
const db = require('../../database/db');

const categoryRouter = express.Router();

categoryRouter.get('/api/category', async (req, res) => {
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

module.exports = categoryRouter;