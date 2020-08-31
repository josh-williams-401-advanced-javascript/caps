'use strict';

const events = require('./events');
const vendor = require('./vendor');

events.on('pickup', logPickup);
function logPickup(payload) {
  const EVENT = {
    event: 'pickup',
    time: new Date(),
    payload: payload,
  };
  console.log('EVENT', EVENT);
}
