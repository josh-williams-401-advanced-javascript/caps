'use strict';

const events = require('./events');

require('./vendor');

events.on('pickup', driving);

function driving(payload) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    events.emit('in-transit', payload);
  }, 1000);
  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);
}

