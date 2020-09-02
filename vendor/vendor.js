'use strict';

require('dotenv').config();
const net = require('net');
const faker = require('faker');
const client = new net.Socket();
const storeName = process.env.STORE_NAME || 'Cinnamon';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3001;

client.connect(port, host, () => { });

client.on('data', function(buffer) {
  const orderEvent = JSON.parse(buffer.toString().trim());
  if (orderEvent.event === 'delivered') {
    console.log(`Thank you for delivering ${orderEvent.payload.orderID}`);
  }
} )

function startOrders() {
  setInterval(() => {
    const fakeOrder = {
      store: storeName,
      orderID: faker.random.alphaNumeric(20),
      customer: faker.fake('{{name.firstName}} {{name.lastName}}'),
      address: faker.address.streetAddress(),
    };
    const event = JSON.stringify({
      event: 'pickup',
      time: new Date().toUTCString(),
      payload: fakeOrder
    })
    client.write(event);
  }, 5000);
}

startOrders();