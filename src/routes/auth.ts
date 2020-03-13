import {Router} from 'express'
import AuthController from '../controller/AuthController';

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     name: Register
 *     summary: Creates a new user account
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - name
 *           - email
 *           - password
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid properties, Name, Email and Password Required
 *       '409':
 *         description: Email already exist
 */
router.post('/register', AuthController.register);

export default router;
