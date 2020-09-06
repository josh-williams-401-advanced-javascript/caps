'use strict';

require('../acme-widgets');
const client = require('socket.io-client');
const { internet } = require('faker');
let socket = client.connect();


describe('tests for socket queue', () => {
  it('sends received delivery message', () => {
    
    console.log = jest.fn();

    socket.emit('delivered', {orderID: '1234'});

    expect(console.log).toHaveBeenCalledWith('Thank you for delivering 1234');
   
  });

  it('emits the received handler on delivery', () => {

    const receivedHandler = jest.fn();

    socket.on('received', receivedHandler);

    socket.emit('delivered', {orderID: '1234'});

    expect(receivedHandler).toHaveBeenCalled();

  });

});


