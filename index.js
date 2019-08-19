// npm init -> initialize a new npm project -> creates a package.json file
const express = require('express');
const bodyParser = express.json();
const home = require('./routes/homeRouter');

function main() {
  const app = express();
  const port = process.env.PORT || 8000;
  app.use(bodyParser);

  app.use('/api/', home);

  app.get('/', function(req, res) {
    console.log('Server called on Home');
    res.send('Home called' + 'This time with nodemon');
  });

  app.post('/:id/:name', (req, res) => {
    console.log('Req ', req);
    const param = req.params;
    const body = req.body;
    console.log('Body ', body, 'Param ', param);

    console.log(param);
    res.send({ body });
  });

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
