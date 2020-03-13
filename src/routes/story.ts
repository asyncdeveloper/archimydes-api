import {Router} from 'express';
import StoryController from "../controller/StoryController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkIfAuthorized} from "../middlewares/checkIfAuthorized";

const router = Router();

router.post('/', checkJwt , StoryController.create);

router.patch('/:storyId/assign',[ checkJwt, checkIfAuthorized ], StoryController.assign);

router.put('/:storyId', [ checkJwt, checkIfAuthorized ], StoryController.update);

export default router;
