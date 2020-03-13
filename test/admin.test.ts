import * as request from 'supertest';
import app from "../src/app";
import {Connection} from "typeorm";
import {Role} from "../src/entity/Role";
import {User} from "../src/entity/User";
import {State, Story, Types} from "../src/entity/Story";
import * as bcrypt from 'bcryptjs'

const seedData = async (connection, model, data ) => {
    await connection.createQueryBuilder()
        .insert()
        .into(model)
        .values(data).execute();
};

const hashPassword = (string) =>  {
    return bcrypt.hashSync(string, 10);
};

describe('Admin CRUD', function () {
    let connection: Connection;
    let loggedInUser: User;
    let normalUserToken: string;
    let loggedInAdmin: User;
    let adminUserToken: string;


    beforeAll(async () => {
        connection =  await app.connection;
        await connection.runMigrations();
    });

    beforeEach(async () => {
        await seedData(connection, Role, [ { name: 'admin'}, { name: 'user'} ]);

        const userRole = await Role.findOne({ where: { name: 'user' } });
        const adminRole = await Role.findOne({ where: { name: 'admin' } });

        await seedData(connection, User, [
            {
                name: 'John Doe', role: userRole, email: 'johndoe@example.com',
                password: hashPassword('123456')
            }
        ]);

        await seedData(connection, User, [
            {
                name: 'Administrator', role: adminRole,
                email: 'admin@example.com', password: hashPassword('123456')
            }
        ]);

        const normalUserLoginRes = await request(app.express)
            .post('/api/v1/auth/login')
            .send({ 'email' : 'johndoe@example.com', 'password' : '123456' });
        normalUserToken = normalUserLoginRes.body.token;
        loggedInUser = normalUserLoginRes.body.user;


        const adminUserLoginRes: any = await request(app.express)
            .post('/api/v1/auth/login')
            .send({ 'email' : 'admin@example.com', 'password' : '123456' });

        adminUserToken = adminUserLoginRes.body.token;
        loggedInAdmin = adminUserLoginRes.body.user;
    });

    afterEach(async () => {
        await connection.synchronize(true);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('allows an  admin view all assigned stories', async (done) => {
        //Create multiple stories by regular user
        const story = {
            "summary": "A New One",
            "description": "My Des",
            types : Types.BUGFIX,
            "complexity": "difficult",
            "estimated_time": "22:00:11",
            "cost": 200,
            "owner": loggedInUser,
            state: State.WAITING_AUTHORIZATION
        };

        await connection.createQueryBuilder()
            .insert()
            .into(Story)
            .values([ story ]).execute();

        await request(app.express)
            .patch(`/api/v1/story/1/assign`)
            .send({ 'reviewerId': loggedInAdmin.id })
            .set('Authorization', `Bearer ${normalUserToken}`);

        const response: any = await request(app.express)
            .get('/api/v1/admin/stories')
            .set('Authorization', `Bearer ${adminUserToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');

        done();
    });

});
