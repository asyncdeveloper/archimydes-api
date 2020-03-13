import {Connection, createConnection, getConnectionOptions} from 'typeorm'
import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import routes from './routes';
import 'reflect-metadata';

dotenv.config();

class App {
    public express: express.Application;
    public connection: any ;

    public constructor () {
        this.express = express();

        this.setUpMiddleware();

        this.setUpRoutes();

        this.connection= App.setUpDatabase();
    }

    private setUpMiddleware (): void {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(express.json());
    }

    private setUpRoutes (): void {
        this.express.use('/', routes);
    }

    private static async setUpDatabase (): Promise<Connection> {
        const config = await getConnectionOptions(process.env.NODE_ENV || 'production');
        return await createConnection({ ...config , 'name': 'default' });
    }
}

export default new App();
