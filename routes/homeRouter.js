const express = require('express');
const home = express.Router();

home.get('/', (req, res) => {
  res.send('Using router');
});

home.get('/getData', (req, res) => {
  res.send('Get Data called');
});

module.exports = home;
