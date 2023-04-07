const request = require('supertest');
const app = require('../../server');

describe('POST /users/login', () => {
  afterAll(async () => {
    await app.close();
  });

  it('should return user token and user object', async () => {
    const testData = {
      email: 'mark@gmail.com',
      password: '1234567',
    };

    const response = await request(app).post('/api/users/login').send(testData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });
});
