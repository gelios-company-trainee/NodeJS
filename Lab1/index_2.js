'use strict'

const express = require('express');

const itemRoute = require('./api/items-api');

const app = express();

app.use('/items', itemRoute);

app.listen(8080, '127.0.0.1', () => console.log('server start at 127.0.0.1:8080'));