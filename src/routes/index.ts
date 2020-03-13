import {Router} from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as specs from '../swagger';

import auth from './auth';

const routes = Router();

routes.use('/api/v1', auth);

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(specs.default));

export default routes;
