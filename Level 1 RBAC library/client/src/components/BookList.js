import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <Link to={`/edit/${book._id}`}>Edit</Link>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
