const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const readTodos =()=>{
    const data = fs.readFileSync('db.json');
    return JSON.parse(data);
};

const writeTodos=(todos)=>{
    fs.writeFileSync('db.json', JSON.stringify(todos,null,2));
};

app.get('/todos',(req, res)=>{
    const todos = readTodos();
    res.json(todos);
});

app.post('/todos', (req, res)=>{
    const todos = readTodos();
    const newTodo = req.body;
    todos.todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
})

app.put('/todos/update-status',(req,res)=>{
    const todos = readTodos();
    todos.todos = todos.todos.map(todo=>{
        if(todo.id%2 ===0 && todo.status===false){
            todo.status = true;
    }
      return todo;
});
      writeTodos(todos);
      res.json(todos);
})

app.delete('/todos/delete-completed',(req,res)=>{
    const todos = readTodos();
    todos.todos = todos.todos.filter(todo=>todo.todo.status !==true);
    writeTodos(todos);
    res.json(todos);
});

app.listen(PORT,()=>{
    console.log('server is running');
});