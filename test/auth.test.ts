import * as request from 'supertest';
import app from "../src/app";
import {Connection} from "typeorm";

describe('Authentication ', function () {
    let connection: Connection;

    beforeAll(async () => {
        connection =  await app.connection;
        await connection.runMigrations();
    });

    afterEach(async () => {
        await connection.synchronize(true);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('allows user register with name, email, role and password', async (done) => {
        const userData = {
            'name': 'John Doe',
            'email': 'johndoe@example.com',
            'password': '12345',
            'role': '1'
        };

        const response: any = await request(app.express)
            .post('/api/v1/register')
            .send(userData);

        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('email');
        expect(response.body).toHaveProperty('role');

        done();
    });

    it('does not allow registration with invalid credentials', async (done) => {
        const userData = {
            'name': 'e',
            'email': 'johndoem',
            'password': '125',
            'role': 'aaa'
        };

        const response: any = await request(app.express)
            .post('/api/v1/register')
            .send(userData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');

        done();
    });

    it('does not allow registration with already existing email', async (done) => {
        const userData = {
            'name': 'John Doe',
            'email': 'johndoe@example.com',
            'password': '12345',
            'role': '1',
        };

        await request(app.express)
            .post('/api/v1/register')
            .send(userData);

        const response: any = await request(app.express)
            .post('/api/v1/register')
            .send(userData);

        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('error');

        done();
    });

});
