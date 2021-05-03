require('dotenv').config();
import express from 'express';

import TexturePacksRoutes from '@routes/TexturePacks.routes';
import { MongoManager } from '@utils/MongoManager';

class Server {
  public url: string = '/api/v1';
  public app: express.Express;
  public mongoDB: MongoManager;

  constructor() {
    this.app = express();
    this.mongoDB = new MongoManager();
    this.mongoDB.connect(process.env.MONGO_URI);

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Routes
    this.app.use(this.url, TexturePacksRoutes.router);
  }
}

export default new Server();
