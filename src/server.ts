require('dotenv').config();
import express from 'express';

import SkinPacksRoutes from '@routes/SkinPacks.routes';
import TexturePacksRoutes from '@routes/TexturePacks.routes';
import MashUpPacksRoutes from '@routes/MashUpPacks.routes';
import AdventureMapsRoutes from '@routes/AdventureMaps.routes';
import MiniGamesRoutes from '@routes/MiniGames.routes';
import SurvivalSpawnsRoutes from '@routes/SurvivalSpawns.routes';
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
    this.app.use(this.url, SkinPacksRoutes.router);
    this.app.use(this.url, TexturePacksRoutes.router);
    this.app.use(this.url, MashUpPacksRoutes.router);
    this.app.use(this.url, AdventureMapsRoutes.router);
    this.app.use(this.url, MiniGamesRoutes.router);
    this.app.use(this.url, SurvivalSpawnsRoutes.router);
  }
}

export default new Server();
