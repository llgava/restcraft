require('dotenv').config();
import express from 'express';
import { BlocksRoutes } from '@routes/Blocks.routes';
import { MongoManager } from '@utils/MongoManager';

export class Server {
  public app: express.Express = express();

  constructor(url = '/api') {
    MongoManager.connect(process.env.MONGO_URI);

    //this.app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // API Routes
    this.app.use(url, new BlocksRoutes().getRouter);
  }
}

export default new Server();
