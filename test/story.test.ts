import * as request from 'supertest';
import app from "../src/app";
import {Connection} from "typeorm";
import {Role} from "../src/entity/Role";
import {User} from "../src/entity/User";

describe('Story CRUD ', function () {
    let connection: Connection;
    let token: string;
    let loggedInUser: User;

    beforeAll(async () => {
        connection =  await app.connection;
        await connection.runMigrations();
    });

    beforeEach(async () => {

        //Seed Roles
        const role1: Role = new Role();
        role1.name = 'admin';
        await role1.save();

        const role2: Role = new Role();
        role2.name = 'user';
        await role2.save();

        const userRole = await Role.findOne({ where: { name: 'user' } });

        //Regular User
        const user: User = new User();
        user.name = "John Doe";
        user.password = "12345111";
        user.role = userRole;
        user.email = "johndoe@example.com";
        user.hashPassword();
        await user.save();

        loggedInUser = await User.findOne({
            relations: ["role"],
            where: { email :  "johndoe@example.com" }
        });

        const response: any = await request(app.express)
            .post('/api/v1/auth/login')
            .send({ 'email' : user.email, 'password' : '12345111' });

        token = response.body.token;
    });

    afterEach(async () => {
        await connection.synchronize(true);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('allows a user create a new story', async (done) => {
        const response: any = await request(app.express)
            .post('/api/v1/story')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "summary": "Summary",
                "description": "description",
                "types" : "ENHANCEMENT",
                "complexity": "difficult",
                "estimated_time": "22:00:11",
                "cost": "2001",
                "owner": loggedInUser.id,
                "state": "WAITING_AUTHORIZATION"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");

        done();
    });

    it('allows a user assign a story to admin', async (done) => {
        const adminRole = await Role.findOne({ where: { name: 'admin' } });

        //Admin User
        const admin: User = new User();
        admin.name = "Admin Admin";
        admin.password = "pass1234";
        admin.role = adminRole;
        admin.email = "adminadmin@example.com";
        admin.hashPassword();
        await admin.save();

        //Create a story
        const createStoryResponse = await request(app.express)
            .post('/api/v1/story')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "summary": "Summary",
                "description": "description",
                "types" : "ENHANCEMENT",
                "complexity": "difficult",
                "estimated_time": "22:00:11",
                "cost": "2001",
                "owner": loggedInUser.id,
                "state": "WAITING_AUTHORIZATION"
            });

        const response : any =  await request(app.express)
            .patch(`/api/v1/story/${createStoryResponse.body.id}/assign`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "reviewerId": admin.id
            });

        expect(response.statusCode).toBe(204);

        done();
    });

    it('allows a user view all created stories', async (done) => {
        const story = {
            "summary": "A New One",
            "description": "My Des",
            "types" : "BUGFIX",
            "complexity": "difficult",
            "estimated_time": "22:00:11",
            "cost": "100",
            "owner": loggedInUser.id,
            "state": "WAITING_AUTHORIZATION"
        };

        //Create multiple stories
         await request(app.express)
            .post('/api/v1/story')
            .set('Authorization', `Bearer ${token}`)
            .send(story);

        await request(app.express)
            .post('/api/v1/story')
            .set('Authorization', `Bearer ${token}`)
            .send(story);

        const response : any = await request(app.express)
            .get('/api/v1/story')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBe(2);

        done();
    });

});
