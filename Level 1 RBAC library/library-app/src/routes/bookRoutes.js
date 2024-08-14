const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/add-book', bookController.createBook);
router.get('/', bookController.getBooks);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
