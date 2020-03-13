import {Router} from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as specs from '../swagger';

import auth from './auth';
import story from './story';

const routes = Router();

routes.use('/api/v1/auth', auth);
routes.use('/api/v1/story', story);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(specs.default));

export default routes;
