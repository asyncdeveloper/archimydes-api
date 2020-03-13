import {Router} from 'express';
import StoryController from "../controller/StoryController";
import {checkJwt} from "../middlewares/checkJwt";

const router = Router();

router.post('/', checkJwt , StoryController.create);

router.patch('/:storyId', checkJwt, StoryController.update);

export default router;
