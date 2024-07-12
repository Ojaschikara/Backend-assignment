const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function to read data from db.json
const readTodos = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data).todos;
};

// Helper function to write data to db.json
const writeTodos = (todos) => {
  fs.writeFileSync('db.json', JSON.stringify({ todos }, null, 2));
};

// Get all todos
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Update the status of all todos with even IDs from false to true
app.put('/todos/even-status', (req, res) => {
  let todos = readTodos();
  todos = todos.map(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      return { ...todo, status: true };
    }
    return todo;
  });
  writeTodos(todos);
  res.json(todos);
});

// Delete all todos whose status is true
app.delete('/todos/delete', (req, res) => {
  let todos = readTodos();
  todos = todos.filter(todo => !todo.status);
  writeTodos(todos);
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});