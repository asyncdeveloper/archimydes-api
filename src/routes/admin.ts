import {Router} from 'express';
import {checkJwt} from "../middlewares/checkJwt";
import {checkIfAdmin} from "../middlewares/checkIfAdmin";
import AdminController from "../controller/AdminController";

const router = Router();

router.get('/stories',[ checkJwt, checkIfAdmin ], AdminController.index);

router.put('/story/:storyId', [ checkJwt, checkIfAdmin ], AdminController.update);

export default router;
