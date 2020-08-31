'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');
const storeName = process.env.STORE_NAME || 'Great Deliveries';

events.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

module.exports = setInterval(() => {
  const fakeOrder = {
    storeName: storeName,
    orderID: faker.random.alphaNumeric(10),
    customer: faker.fake('{{name.firstName}} {{name.lastName}}'),
    address: faker.address.streetAddress(),
  };
  events.emit('pickup', fakeOrder);
}, 5000);