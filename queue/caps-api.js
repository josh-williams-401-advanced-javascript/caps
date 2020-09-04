'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const io = require('socket.io-client');
const capsNamespace = io.connect(`http://localhost:${process.env.PORT || 8080}/caps`);

app.post('/pickup', (req, res) => {
  if (!req.query.store) {
    req.query = {
      store: '1-206-flowers',
      orderID: '4023490zdffdg',
      customer: 'Jimi Hendrix',
      address: 'Sweet Home, AL',
    };
  }
  capsNamespace.emit('join', req.query.store);
  capsNamespace.emit('pickup', req.query);
  res.status(200).send();
});

app.post('/delivery', (req,res) => {
  capsNamespace.emit('delivered', {retailer:'1-206-flowers', code: '4023490zdffdg'});
  res.status(200).send();
});

app.post('/delivery/:retailer/:code', (req, res) => {
  capsNamespace.emit('delivered', req.params);
  res.status(200).send();
});

app.listen(3001, () => console.log('listening on 3001'));