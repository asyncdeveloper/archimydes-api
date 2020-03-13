import {Router} from 'express';
import StoryController from "../controller/StoryController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkIfAuthorized} from "../middlewares/checkIfAuthorized";

const router = Router();

/**
 * @swagger
 * 'story/assign':
 *   patch:
 *     tags:
 *       - Story
 *     name: Assign Story
 *     summary: User assigns a story to admin
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
 *             reviewer:
 *               type: string
 *         required:
 *           - reviewer
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
 *         description: Story not found
 */
router.patch('/:storyId/assign',[ checkJwt, checkIfAuthorized ], StoryController.assign);

/**
 * @swagger
 * '/story':
 *   put:
 *     tags:
 *       - Story
 *     name: User Update Story
 *     summary: User update a story
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
router.put('/:storyId', [ checkJwt, checkIfAuthorized ], StoryController.update);

/**
 * @swagger
 * 'story/':
 *   post:
 *     tags:
 *       - Story
 *     name: Create Story
 *     summary: User creates a story
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
 *       '201':
 *         description: Story created successfully
 *       '400':
 *         description: Invalid story properties
 *       '401':
 *         description: Invalid token
 */
router.post('/', checkJwt , StoryController.create);

/**
 * @swagger
 * 'story/':
 *   get:
 *     tags:
 *       - Story
 *     name: View Story
 *     summary: Users views all created stories
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Show user created stories
 *       '401':
 *         description: Invalid token
 *       '403':
 *         description: Unauthorized
 */
router.get('/', checkJwt , StoryController.index);

export default router;
