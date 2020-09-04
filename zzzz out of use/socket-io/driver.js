'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const capNamespace = io.connect(`http://localhost:${ process.env.PORT || 8080 }/caps`);

capNamespace.on('pickup', order => onPickup(order));

function onPickup(order) {

  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderID}`);
    capNamespace.emit('in-transit', order);
  }, 1500);

  setTimeout(() => {
    console.log(`DRIVER: delivered ${order.orderID}`);
    capNamespace.emit('delivered', order);
  }, 3000);

}

