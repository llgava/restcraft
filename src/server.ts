require('dotenv').config();
import express from 'express';
import BlocksRoutes from '@routes/Blocks.routes';
import { MongoManager } from '@utils/MongoManager';

class Server {
  public url: string = '/api';
  public app: express.Express;

  constructor() {
    this.app = express();
    MongoManager.connect(process.env.MONGO_URI);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Routes
    this.app.use(this.url, BlocksRoutes.router);
  }
}

export default new Server();
