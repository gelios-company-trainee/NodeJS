const express = require('express');

const itemRouter = express();

itemRouter.get('/', (req, res) => {
  res.send({name: 'dadsdad'});
})

itemRouter.post('/', (req, res) => {
  res.send('Hello');
})

itemRouter.put('/', (req, res) => {
  res.send('Hello');
})

itemRouter.patch('/', (req, res) => {
  res.send('Hello');
})

itemRouter.delete('/', (req, res) => {
  res.send('Hello');
})

module.exports = itemRouter;