import express from 'express';

import CatalogRoutes from '@routes/Catalog.routes';

class Server {
  public url: any = '/api/v1';
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Routes
    this.app.use(this.url, CatalogRoutes.router);
  }
}


export default new Server();
