'use strict';


require('dotenv').config();
const io =require('socket.io')(process.env.PORT || 3000);

const caps = io.of('/caps');

caps.on('connection', socket => {
  console.log('connected to socket', socket.id, 'on /caps');

  socket.on('join', room => {
    console.log('joined', room);
    socket.join(room);
  });
});

