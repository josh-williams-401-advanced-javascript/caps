'use strict';

const events = require('./events');
require('./driver');
require('./vendor');

events.on('pickup', payload => logEvent('pickup', payload));
events.on('in-transit', payload => logEvent('in-transit', payload));
events.on('delivered', payload => logEvent('delivered', payload));
function logEvent(event, payload) {
  const EVENT = {
    event: event,
    time: new Date(),
    payload: payload,
  };
  console.log('EVENT', EVENT);
}
