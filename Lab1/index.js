'use strict'

const express = require('express');

const app = express();

app.get('/test', (req, res) => {
  res.status(200).send('hello');
})

app.listen(8080, '127.0.0.1', () => console.log('server start at 127.0.0.1:8080'));