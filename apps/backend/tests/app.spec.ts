import request from 'supertest';

import { app } from '../src/app';

describe('App', () => {
  it('should return API health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      message: 'HelpDesk API is running',
    });
  });
});
