import React, { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';

const BookList = () => {
  const { auth } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get('/books');
        setBooks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      {auth?.user?.roles.includes('CREATOR') && (
        <>
          <AddBookForm setBooks={setBooks} />
          {editingBook && <EditBookForm book={editingBook} setBooks={setBooks} setEditingBook={setEditingBook} />}
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.createdBy.username}</td>
              <td>
                {auth?.user?.roles.includes('CREATOR') && (
                  <>
                    <button onClick={() => setEditingBook(book)}>Edit</button>
                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
