const express = require('express');
const db = require('../../database/db');

const uploadRouter = express.Router();

uploadRouter.post('/api/upload', async (req, res) => {
    // Handle the upload logic here
    console.log('Received a POST request to /api/upload');
    console.log(req.body);

    try {
        const postData = req.body; // Extract data from the request body
        const insertQuery = 'INSERT INTO post (post_id, post_title, post_desc, post_article, post_feedback, post_date, post_author, cover_image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        // Execute the SQL query with the extracted data
        db.query(insertQuery, [postData.id, postData.title, postData.description, postData.content, 0, postData.date, postData.author, postData.image, postData.category], (error, result) => {
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

uploadRouter.put('/api/upload/:postId', async (req, res) => {
    // Handle the update logic here
    console.log('Received a PUT request to /api/upload');
    console.log(req.body);

    try {
        const postId = req.params.postId;
        const postData = req.body; // Extract data from the request body

        const updateQuery = 'UPDATE post SET post_title = ?, post_desc = ?, post_article = ?, post_feedback = ?, post_date = ?, post_author = ?, category_id = ?, cover_image = ? WHERE post_id = ?';

        // Execute the SQL query with the extracted data
        db.query(updateQuery, [postData.title, postData.description, postData.content, postData.feedback, postData.date, postData.author, postData.category, postData.image, postId], (error, result) => {
            if (error) {
                console.error(error.message);
                res.status(500).send('Internal Server Error');
            } else {
                if (result.affectedRows > 0) {
                    console.log('Data updated successfully');
                    res.status(200).json({ message: 'Update successful' });
                } else {
                    console.log('No matching record found for update');
                    res.status(404).json({ message: 'No matching record found for update' });
                }
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = uploadRouter;