'use strict';

const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('dotenv').config();

const io = require('socket.io-client');
const capsNamespace = io.connect(`http://localhost:${process.env.PORT || 8080}/caps`);

app.post('/pickup', (req, res) => {
  if (!req.body.store) {
    req.body = {
      store: '1-206-flowers',
      orderID: '4023490zdffdg',
      customer: 'Jimi Hendrix',
      address: 'Sweet Home, AL',
    };
  }
  console.log(req.body);
  capsNamespace.emit('join', req.body.store);
  capsNamespace.emit('pickup', req.body);
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