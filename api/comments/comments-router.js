const express = require('express');

const Comments = require('./comments-model');

const router = express.Router();

router.get('/', (req, res) => {
    Comments.getComments()
    .then(comment => {
        res.status(200).json({
            message: 'successfully got comments',
            comment
        })
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: 'error getting comments!'
        })
    })
})

module.exports = router;