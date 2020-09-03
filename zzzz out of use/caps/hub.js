'use strict';

require('dotenv').config();
const faker = require('faker');

const net = require('net');
const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Listening on ${port}`));

const socketPool = {};

server.on('connection', (socket) => {
  const id = `socket-${faker.random.alphaNumeric(15)}`;
  socketPool[id] = socket;
  console.log('socket connected:', socket);

  socket.on('data', buffer => {
    const eventInfo = JSON.parse(buffer.toString().trim());
    if(eventInfo.payload && eventInfo.event) {
      console.log('EVENT', eventInfo);
      broadcastEvent(eventInfo);
    }
  });
  socket.on( 'error', err => console.log('SOCKET ERROR', err) );
  socket.on( 'end', err => delete socketPool[id] );
});

function broadcastEvent (eventInfo) {
  const event = JSON.stringify(eventInfo);
  for(let socket in socketPool) {
    socketPool[socket].write(event);
  }
}

server.on('error', e => console.error(e));

