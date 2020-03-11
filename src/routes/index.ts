import {Router} from 'express'
import * as swaggerUi from 'swagger-ui-express'
import * as specs from '../swagger'

const routes = Router();

routes.use('/', swaggerUi.serve, swaggerUi.setup(specs.default));

export default routes;
