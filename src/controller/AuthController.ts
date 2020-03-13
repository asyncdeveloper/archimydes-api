import {Request, Response} from 'express'
import {validate} from 'class-validator';
import {User} from '../entity/User';

class AuthController {

    public register = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password } = req.body;

        const user: User = new User();
        user.name = name;
        user.password = password;
        user.email = email;

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

}

export default new AuthController();
