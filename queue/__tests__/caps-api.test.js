'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../caps-api');
const client = require('socket.io-client');
let socket = client.connect();

const mockRequest = supergoose(server);

describe('api tests', () => {
  it('emits the correct actions on POST /pickup', async () => {
    const joinHandler = jest.fn();
    const pickupHandler = jest.fn();

    socket.on('join', joinHandler);
    socket.on('pickup', pickupHandler);

    const pickup = await mockRequest.post('/pickup').send();

    expect(pickupHandler).toHaveBeenCalledWith(expect.objectContaining({customer: 'Jimi Hendrix'}));
    expect(joinHandler).toHaveBeenCalledWith('1-206-flowers');
    expect(pickup.status).toBe(200);
  });
  it('posts a delivery correctly', async  () => {
    const deliveryHandler = jest.fn();

    socket.on('delivered', deliveryHandler);

    const delivery = await mockRequest.post('/delivery/test/onetwo').send();
    expect(deliveryHandler).toHaveBeenCalledWith({
      retailer: 'test',
      code: 'onetwo',
    });
    expect(delivery.status).toBe(200);
  });
});


