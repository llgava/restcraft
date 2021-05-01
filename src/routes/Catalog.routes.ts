import { Router } from 'express';
import CatalogController from '../controllers/Catalog.controller';

class CatalogRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/catalog', CatalogController.test);
  }
}

export default new CatalogRoutes();
