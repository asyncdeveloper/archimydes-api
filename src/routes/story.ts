import {Router} from 'express';
import StoryController from "../controller/StoryController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkIfAuthorized} from "../middlewares/checkIfAuthorized";

const router = Router();

router.patch('/:storyId/assign',[ checkJwt, checkIfAuthorized ], StoryController.assign);

router.put('/:storyId', [ checkJwt, checkIfAuthorized ], StoryController.update);

router.post('/', checkJwt , StoryController.create);

router.get('/', checkJwt , StoryController.index);

export default router;
