'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const storeName = process.env.STORE_NAME;

const capsRoom = io.connect(`http://localhost:${process.env.PORT}/caps`);


capsRoom.emit('join', storeName);



