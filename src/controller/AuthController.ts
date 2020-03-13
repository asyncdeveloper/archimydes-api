import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {validate} from 'class-validator';
import {User} from '../entity/User';
import {Role} from "../entity/Role";
import config from "../config/config";

class AuthController {

    public register = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password, role } = req.body;

        const user: User = new User();
        user.name = name;
        user.password = password;
        user.email = email;
        user.role = role;

        const errors = await validate(user);
        if (errors.length > 0) {
           return res.status(400).json({ error: errors });
        }

        //Check Email in use
        const count: number = await User.count({ where: { email: email } });

        if(count > 0 ) {
            return res.status(409).json({
                error: { message: 'user email already in use' }
            });
        }

        //Check for Role
        const roleCount: number = await Role.count({ where: { id: role } });
        if(roleCount < 1 ) {
            return res.status(409).json({
                error: { message: 'Role does not exist' }
            });
        }

        user.hashPassword();

        try {
            await user.save();
        } catch (err) {
            return res.status(500).json({
                error: { message: "Something went wrong. It's our fault and we are working on it :)" }
            });
        }
        user.password = undefined;
        return res.status(201).json(user);
    };

    public login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({
                error: { message: 'Email and password are compulsory' }
            });
        }

        let user: User;
        try {
            user = await User.findOneOrFail({ where: { email } })
        } catch (error) {
            return res.status(401).json({
                error: { message: 'Invalid credentials' }
            });
        }

        if (!user.checkIfUnEncryptedPasswordIsValid(password)) {
            return res.status(401).json({ error: { message: 'Invalid credentials!' } });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, roleId: user.role },
            config.jwtSecret,
            { expiresIn: '3h' }
        );

        user.password = undefined;
        res.status(200).json({ user, token });
    };

}

export default new AuthController();
