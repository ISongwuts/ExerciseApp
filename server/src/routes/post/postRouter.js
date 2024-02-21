const express = require('express');
const db = require('../../database/db');

const postRouter = express.Router();

postRouter.delete('/api/post/delete/:post_id', async (req, res) => {
    const { post_id } = req.params;
    try {
        const postExists = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM post WHERE post_id = ?", [post_id], (err, result) => {
                if (err) reject(err);
                else resolve(result.length > 0);
            });
        });

        if (postExists) {
            await new Promise((resolve, reject) => {
                db.query("DELETE FROM post WHERE post_id = ?", [post_id], (err, result) => {
                    if (err) reject(err);
                    else resolve();
                });
            });

            return res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

postRouter.get('/api/post/search', async (req, res) => {
    const { search } = req.query;
    try {
        
        const query = `SELECT * FROM post 
                       WHERE post_id LIKE ? OR 
                       post_title LIKE ? OR
                       post_desc LIKE ? OR
                       post_article LIKE ? OR
                       post_author LIKE ?`;

        const data = await new Promise((resolve, reject) => {
            db.query(query, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        return res.send(data);
    } catch (error) {
        return res.status(500).send('Error: ' + error.message);
    }
});

postRouter.get('/api/post/rowcount', async (req, res) => {
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


postRouter.get('/api/post', async (req, res) => {
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

postRouter.get('/api/post/latestPostID', async (req, res) => {
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

postRouter.get('/api/post/page=:id', async (req, res) => {
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


postRouter.get('/api/post/category=:id', async (req, res) => {
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

module.exports = postRouter;