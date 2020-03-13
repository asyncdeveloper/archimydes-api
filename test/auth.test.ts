import * as request from 'supertest';
import app from "../src/app";
import {Connection} from "typeorm";
import {Role} from "../src/entity/Role";
import {User} from "../src/entity/User";

describe('Authentication ', function () {
    let connection: Connection;

    beforeAll(async () => {
        connection =  await app.connection;
        await connection.runMigrations();

        //Seed Roles
        const role1: Role = new Role();
        role1.name = 'admin';
        await role1.save();

        const role2: Role = new Role();
        role2.name = 'user';
        await role2.save();

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

    it('allows registered user login with credentials', async (done) => {
        const role = await Role.findOne({ where: { id: 1 } });
        const user: User = new User();
        user.name = "John Doe";
        user.password = "12345111";
        user.role = role;
        user.email = "johndoe@example.com";
        user.hashPassword();
        await user.save();

        const response: any = await request(app.express)
            .post('/api/v1/login')
            .send({ 'email' : user.email, 'password' : '12345111' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');

        done();
    });

});
