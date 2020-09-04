'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const storeName = '1-206-flowers';

const capsNamespace = io.connect(`http://localhost:${process.env.PORT || 8080}/caps`);

capsNamespace.emit('join', storeName);

capsNamespace.emit('getall', storeName);

capsNamespace.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
  capsNamespace.emit('received', payload);
});


