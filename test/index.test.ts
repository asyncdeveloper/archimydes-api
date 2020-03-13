import * as request from 'supertest';
import app from '../src/app';

describe('Swagger Docs Test', function () {
  it('Shows swagger docs home page', async (done) => {
      const response: any = await request(app.express)
          .get('/docs');

      expect(response.statusCode).toBe(301);

      done();
  })
});
