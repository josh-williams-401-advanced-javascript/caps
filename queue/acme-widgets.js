'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const storeName = 'acme-widgets';

const capsNamespace = io.connect(`http://localhost:${process.env.PORT || 8080}/caps`);

capsNamespace.emit('subscribe', storeName);

capsNamespace.emit('getAll', storeName);

capsNamespace.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
  capsNamespace.emit('received', payload);
});


