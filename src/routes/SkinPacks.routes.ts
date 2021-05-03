import { Router } from 'express';

import SkinPacksController from '@controllers/SkinPacks.controller';

class SkinPacksRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/skin-packs', SkinPacksController.register);
    this.router.put('/skin-packs/update/:uuid', SkinPacksController.update);
    this.router.delete('/skin-packs/delete/:uuid', SkinPacksController.delete);
    this.router.get('/skin-packs', SkinPacksController.listAll);
    this.router.get('/skin-packs/uuid/:uuid', SkinPacksController.listByUUID);
    this.router.get('/skin-packs/title/:title', SkinPacksController.listByTitle);
    this.router.get('/skin-packs/creator/:creator', SkinPacksController.listByCreator);
  }
}

export default new SkinPacksRoutes();
