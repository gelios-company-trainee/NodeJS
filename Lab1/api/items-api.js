'use strict'

const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  console.log('param :id', req.params.id);
  console.log('query param', req.query.name);

  res.status(200).send({id: req.params.id, name: req.query.name});
})

module.exports = router;

