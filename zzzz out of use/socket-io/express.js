'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const io = require('socket.io-client');
const capsNamespace = io.connect(`http://localhost:${process.env.PORT || 8080}/caps`);

app.post('/pickup', (req, res) => {

  capsNamespace.emit('join', req.query.store);

  capsNamespace.emit('pickup', req.query);

  res.status(200).send();

});

capsNamespace.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
});

app.listen( 3001, () => console.log('Listening on 3001') );


