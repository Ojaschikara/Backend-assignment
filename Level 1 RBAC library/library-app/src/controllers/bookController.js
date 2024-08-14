const Book = require('../models/Book');

exports.createBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = new Book({
      title,
      author,
      createdBy: req.user.id
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { old, new: isNew } = req.query;
    let filter = {};
    if (old === '1') {
      filter = { createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) } };
    } else if (isNew === '1') {
      filter = { createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) } };
    }
    const books = await Book.find(filter).populate('createdBy', 'username');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await book.remove();
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
