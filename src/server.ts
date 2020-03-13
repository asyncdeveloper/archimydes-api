import app from './app'
import {Role} from "./entity/Role";

const PORT = process.env.APP_PORT || 3001;

app.express.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.connection.then(async () => {

    const roleCount: number = await Role.count();

    if(roleCount == 0) {
        //Seed Roles
        const role1: Role = new Role();
        role1.name = 'admin';
        await role1.save();

        const role2: Role = new Role();
        role2.name = 'user';
        await role2.save();

        console.log('Saved');
    }
});
