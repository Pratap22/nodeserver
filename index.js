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

  app.get('/get', async (req, res) => {
    try {
      const savedTodos = await Todo.find();
      res.status(200).json(savedTodos);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  });

  // app.use('/api/', home);

  // app.get('/', function(req, res) {
  //   console.log('Server called on Home');
  //   res.send('Home called' + 'This time with nodemon');
  // });

  // app.post('/:id/:name', (req, res) => {
  //   console.log('Req ', req);
  //   const param = req.params;
  //   const body = req.body;
  //   console.log('Body ', body, 'Param ', param);

  //   console.log(param);
  //   res.send({ body });
  // });

  // app.post()
  // app.put()
  // app.delete()
  // app.route()
  // app.router()
  // app.use()

  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
// 1(a). Import express
// 1(b). Create a function called main.
// 2. create an instance of express -> app
// 3. Define a port number
// 4. Listen the specified port
// 5. Call main function
