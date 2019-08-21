// npm init -> initialize a new npm project -> creates a package.json file
const express = require('express');
const bodyParser = express.json();
const home = require('./routes/homeRouter');
const mongoose = require('mongoose');
const Todo = require('./model/TodoList');

function main() {
  const app = express();
  const port = process.env.PORT || 8000;
  app.use(bodyParser);
  mongoose.connect(
    'mongodb+srv://pratap:patanahi@cluster0-ae91p.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => console.log('Database connected')
  );

  // app.post()
  // app.put()
  // app.delete()
  // app.route()
  // app.router()
  // app.use()

  // API
  // Get
  // Get by Id
  // Post
  // Update
  // Delete the post
  // Detelte all

  // Add new Todo
  app.post('/add', (req, res) => {
    const { title, is_completed } = req.body;
    const newTodo = new Todo({
      title: title,
      is_completed: is_completed
    });
    newTodo
      .save()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(400).json({ message: err }));
  });

  // Get all Todos
  app.get('/get', async (req, res) => {
    try {
      const savedTodos = await Todo.find();
      res.status(200).json(savedTodos);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  // Get post by Id
  app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const selectedTodo = await Todo.findById(id);
      res.status(200).json(selectedTodo);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  // Delete by id
  app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTodo = await Todo.remove({ _id: id });
      res.status(200).json(deletedTodo);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  // Update one by id
  app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, is_completed } = req.body;
    try {
      const updatedTodo = await Todo.updateOne(
        { _id: id },
        { $set: { title, is_completed } }
      );
      res.status(200).json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  // Get one by Id
  app.get('/getOne/:id', async (req, res) => {
    const { id } = req.param;
    try {
      const savedTodos = await Todo.findOne({ _id: id });
      res.status(200).json(savedTodos);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  // DeleteMany by ids
  app.delete('/deleteMultiple', async (req, res) => {
    const { ids } = req.body;

    try {
      const deletedTodos = await Todo.remove({ _id: { $in: ids } });
      res.status(200).json(deletedTodos);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
// 1(a). Import express
// 1(b). Create a function called main.
// 2. create an instance of express -> app
// 3. Define a port number
// 4. Listen the specified port
// 5. Call main function

// 1. get all -> Todo.findAll
// 2. update -> Todo.UpdateOne({id}) {setname: ''}
// 3. delete -> Todo.remove({id}) / deleteone / findByIdAndDelete / findOneAndDelete
// 4. delete more than one ->  deleteMany

// function (err){ return {status: 400, message: err.message, }}

// cookies
// JWT
//
