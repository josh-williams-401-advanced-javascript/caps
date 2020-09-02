'use strict';

require('dotenv').config();

const io =require('socket.io')(process.env.PORT || 8080);

const storeName = process.env.STORE_NAME;
const capsNamespace = io.of('/caps');

capsNamespace.on('connection', socket => {
  console.log('connected to socket', socket.id, 'on /caps');

  socket.on('join', room =>  socket.join(room));

  socket.on('pickup', eventHandler('pickup'));

  socket.on('in-transit', eventHandler('in-transit', storeName));

  socket.on('delivered', eventHandler('delivered', storeName));

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
