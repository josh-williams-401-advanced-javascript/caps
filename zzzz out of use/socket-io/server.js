'use strict';

require('dotenv').config();

const io = require('socket.io')(process.env.PORT || 8080);

const capsNamespace = io.of('/caps');

capsNamespace.on('connection', socket => {

  console.log('connected to socket', socket.id);

  socket.on('join', room => socket.join(room));

  socket.on('pickup', eventHandler('pickup'));

  socket.on('in-transit', eventHandler('in-transit'));

  socket.on('delivered', eventHandler('delivered'));

});

function eventHandler(event) {
  return payload => {

    if (event !== 'pickup') { capsNamespace.to(payload.store); }
    capsNamespace.emit(event, payload);

    console.log(`EVENT`, {
      event,
      time: new Date().toUTCString(),
      payload,
    });
    
  };
}
