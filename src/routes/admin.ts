import {Router} from 'express';
import {checkJwt} from "../middlewares/checkJwt";
import {checkIfAdmin} from "../middlewares/checkIfAdmin";
import AdminController from "../controller/AdminController";

const router = Router();

/**
 * @swagger
 * 'admin/stories':
 *   get:
 *     tags:
 *       - Story
 *     name: View Story
 *     summary: Admin view all assigned stories to review
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Show admin user assigned stories
 *       '401':
 *         description: Invalid token
 *       '403':
 *         description: Unauthorized
 */
router.get('/stories',[ checkJwt, checkIfAdmin ], AdminController.index);

/**
 * @swagger
 * 'admin/story/':
 *   put:
 *     tags:
 *       - Story
 *     name: Admin Update Story
 *     summary: Admin approves or reject story
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Story'
 *           type: object
 *           properties:
 *             summary:
 *               type: string
 *             description:
 *               type: string
 *             owner:
 *               type: User
 *             complexity:
 *               type: string
 *             estimated_time:
 *               type: string
 *             cost:
 *               type: string
 *         required:
 *           - summary
 *           - description
 *           - owner
 *           - types
 *           - complexity
 *           - estimated_time
 *           - cost
 *     responses:
 *       '204':
 *         description: Story updated successfully
 *       '400':
 *         description: Invalid story properties
 *       '401':
 *         description: Invalid token
 *       '403':
 *         description: Unauthorized
 *       '404':
 *         description: Story does not exist
 */
router.put('/story/:storyId', [ checkJwt, checkIfAdmin ], AdminController.update);

export default router;
