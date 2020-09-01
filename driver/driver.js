'use strict';

const net = require('net');
require('dotenv').config();

const client = new net.Socket();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

client.connect(port, host, () => {});

client.on('data', deliveredHandler);

function deliveredHandler(payload) {
  const orderDetails = JSON.parse(payload.toString().trim());
  if (orderDetails.event === 'pickup') {
    setTimeout(() => {
      logAndCreateNextEvent(orderDetails, 'pickup', 'in-transit');
    }, 1000);
    setTimeout(() => {
      logAndCreateNextEvent(orderDetails, 'delivered');
    }, 3000);
  }
}

function logAndCreateNextEvent (orderDetails, log, nextEvent) {
  console.log(`${log} ${orderDetails.payload.orderID}`);
  const event = JSON.stringify({
    event: nextEvent || log,
    time: new Date().toUTCString(),
    payload: orderDetails.payload,
  });
  client.write(event);
}
