const express = require('express');
const bodyParser = require('body-parser');

const Logger = require('./class.logger');
const logger = new Logger();

const logger2 = require('./logger');

const itemRouter = require('./itemRouter');

const app = express();

const m1 = require('./m');
m1.name = 'Name2'

const m2 = require('./m');
console.log(m1.name, m2.name);

app.use(bodyParser.json());
// items/dsadsadsads/group/dsadsadasdasdasd?key=value&key2=value2
// items/:id/group/:groupId
app.get('/items/:id/group/:groupId', (req, res) => {
  logger.info(req.params);
  logger.info(req.query);
  logger.info(req.headers);
  logger.info(req.body);

  logger.info('app get');
  res.send('Hello');
})

app.post('/items/:id/group/:groupId', (req, res) => {
  logger.info(req.params);
  logger.info(req.query);
  logger.info(req.headers);
  logger.info(req.body);

  logger.info('app get');
  res.send('Hello');
})

app.use('/items', itemRouter);

app.listen(8080, '127.0.0.1', () => {
  logger.info('Server start at http://127.0.0.1:8080');
})
