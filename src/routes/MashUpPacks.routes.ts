import { Router } from 'express';

import MashUpPacksController from '@controllers/MashUpPacks.controller';

class SkinPacksRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/mash-up-packs', MashUpPacksController.register);
    this.router.put('/mash-up-packs/update/:uuid', MashUpPacksController.update);
    this.router.delete('/mash-up-packs/delete/:uuid', MashUpPacksController.delete);
    this.router.get('/mash-up-packs', MashUpPacksController.listAll);
    this.router.get('/mash-up-packs/uuid/:uuid', MashUpPacksController.listByUUID);
    this.router.get('/mash-up-packs/title/:title', MashUpPacksController.listByTitle);
    this.router.get('/mash-up-packs/creator/:creator', MashUpPacksController.listByCreator);
  }
}

export default new SkinPacksRoutes();
