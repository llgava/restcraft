import { Router } from 'express';

import TexturePacksController from '@controllers/TexturePacks.controller';

class TexturePacksRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/texture-packs', TexturePacksController.register);
    this.router.put('/texture-packs/update/:uuid', TexturePacksController.update);
    this.router.get('/texture-packs', TexturePacksController.listAll);
    this.router.get('/texture-packs/uuid/:uuid', TexturePacksController.listByUUID);
    this.router.get('/texture-packs/title/:title', TexturePacksController.listByTitle);
    this.router.get('/texture-packs/creator/:creator', TexturePacksController.listByCreator);
  }
}

export default new TexturePacksRoutes();
