import supertest from 'supertest';
import { app } from './app';
import { describe, it, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';

let server: any;
declare const global: NodeJS.Global & typeof globalThis; 

describe('/', () => {
  beforeAll((done) => {
    server = app.listen(null, () => {
      global.agent = supertest.agent(server);  
      done();
    });
  }); 

  it('GET should return 200', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

/*   it('POST should return 200', async () => {
    const response = await supertest(app).post('/');
    expect(response.status).toBe(200);
  });

  it('DELETE should return 200', async () => {
    const response = await supertest(app).delete('/');w
    expect(response.status).toBe(200);
  });

  it('PUT should return 200', async () => {
    const response = await supertest(app).put('/');
    expect(response.status).toBe(200);
  }); */

  afterAll(async () => {
    await server.close();
  });
});