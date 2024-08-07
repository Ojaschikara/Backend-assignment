const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

// Example for the CRUD methods
router.get('/', auth, async (req, res) => {
 
  res.send('Protected route - fetch all posts');
});

router.post('/', auth, async (req, res) => {
 
  res.send('Protected route - create a new post');
});

router.put('/:id', auth, async (req, res) => {
  res.send(`Protected route - update post with id ${req.params.id}`);
});

router.delete('/:id', auth, async (req, res) => {
  res.send(`Protected route - delete post with id ${req.params.id}`);
});

module.exports = router;
