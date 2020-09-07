'use strict';

require('dotenv').config();

const io = require('socket.io')(process.env.SOCKET_PORT || 8080);

const capsNamespace = io.of('/caps');

const queue = {};

capsNamespace.on('connection', socket => {

  console.log('connected to socket', socket.id);

  socket.on('join', room => {
    socket.join(room);
    if (!queue[room]) {
      queue[room] = {};
    }
  });

  socket.on('pickup', eventHandler('pickup'));

  socket.on('received', payload => {
    if (queue[payload.store] && queue[payload.store][payload.orderID]) {
      delete queue[payload.store][payload.orderID];
    }
  });

  socket.on('getall', storeName => {
    if (queue[storeName] && Object.keys(queue[storeName]).length) {
      for (let id in queue[storeName]) {
        let payload = queue[storeName][id];
        capsNamespace.to(storeName).emit('delivered', payload);
      }
    }
  });

  socket.on('delivered', deliveryDetails => {
    let payload;
    if(queue[deliveryDetails.retailer] && queue[deliveryDetails.retailer][deliveryDetails.code]) {
      payload = queue[deliveryDetails.retailer][deliveryDetails.code];
    } else {
      payload = 'Bad delivery';
    }
    eventHandler('delivered')(payload);
  });
});

function eventHandler(event) {
  return payload => {
    if (event === 'pickup') {
      if (queue[payload.store]) {
        queue[payload.store][payload.orderID] = payload;
      } else {
        queue[payload.store] = {};
        queue[payload.store][payload.orderID] = payload;
      }
      capsNamespace.emit(event, payload);
    } else {
      if (payload && queue[payload.store]) {
        capsNamespace.to(payload.store).emit(event, payload);
      } else {
        payload = 'Bad Delivery';
      }
    }
    console.log(`EVENT`, {
      event,
      time: new Date().toUTCString(),
      payload,
    });
  };
}