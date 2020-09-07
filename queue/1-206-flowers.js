'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const storeName = '1-206-flowers';

const capsNamespace = io.connect(`${process.env.SOCKET_PORT}/caps`);

capsNamespace.emit('join', storeName);

capsNamespace.emit('getall', storeName);

capsNamespace.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
  capsNamespace.emit('received', payload);
});


