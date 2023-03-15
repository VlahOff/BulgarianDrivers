const { createPost } = require('../services/postsService');
const errorParser = require('../utils/errorParser');

const postController = require('express').Router();

postController.get('/posts', (req, res) => {

});

postController.post('/posts', (req, res) => {
  try {
    createPost('E4206MT', 'Best driver', 'Best driver that was ever born', 5, req.user.userId);
  } catch (error) {
    res.status(400).json({
      message: errorParser(error)
    });
  }
});

postController.put('/posts', (req, res) => {

});

postController.delete('/posts', (req, res) => {

});

module.exports = postController;