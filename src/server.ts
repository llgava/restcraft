require('dotenv').config();
import express, { Express } from 'express';
import BlocksRoutes from '@routes/Blocks.routes';
import { MongoManager } from '@utils/MongoManager';

export class Server {
  public app: Express = express();

  constructor(url = '/api') {
    MongoManager.connect(process.env.MONGO_URI);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Server routes
    this.app.use(url, BlocksRoutes.router);
  }
}
