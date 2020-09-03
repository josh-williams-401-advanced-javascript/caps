'use strict';

require('dotenv').config();

const io = require('socket.io')(process.env.PORT || 8080);

const capsNamespace = io.of('/caps');
let roomName = '';

capsNamespace.on('connection', socket => {
  console.log('connected to socket', socket.id);

  socket.on('join', room => {
    socket.join(room);
    roomName = room;
  });

  socket.on('pickup', eventHandler('pickup'));

  socket.on('in-transit', eventHandler('in-transit', roomName));

  socket.on('delivered', eventHandler('delivered', roomName));

});

function eventHandler(event, store) {
  return payload => {
    if(store) {
      capsNamespace.to(store)
        .emit(event, payload);
    } else {
      capsNamespace.emit(event, payload);
    }
    const time = new Date().toUTCString();
    console.log(`EVENT`, {
      event,
      time,
      payload,
    });
  };
}
