'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const storeName = process.env.STORE_NAME;
const faker = require('faker');

const capsNamespace = io.connect(`http://localhost:${process.env.PORT || 8080 }/caps`);

capsNamespace.emit('join', storeName);
capsNamespace.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderID}`);
});

function startOrders() {
  setInterval(() => {
    const fakeOrder = {
      store: storeName,
      orderID: faker.random.alphaNumeric(20),
      customer: faker.fake('{{name.firstName}} {{name.lastName}}'),
      address: faker.address.streetAddress(),
    };
    capsNamespace.emit('pickup', fakeOrder);
  }, 5000);
}

startOrders();

// For testing
module.exports = { start: () => startOrders() };

