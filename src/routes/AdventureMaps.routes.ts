import { Router } from 'express';

import AdventureMapsController from '@controllers/AdventureMaps.controller';

class AdventureMapsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/adventure-maps', AdventureMapsController.register);
    this.router.put('/adventure-maps/update/:uuid', AdventureMapsController.update);
    this.router.delete('/adventure-maps/delete/:uuid', AdventureMapsController.delete);
    this.router.get('/adventure-maps', AdventureMapsController.listAll);
    this.router.get('/adventure-maps/uuid/:uuid', AdventureMapsController.listByUUID);
    this.router.get('/adventure-maps/title/:title', AdventureMapsController.listByTitle);
    this.router.get('/adventure-maps/creator/:creator', AdventureMapsController.listByCreator);
  }
}

export default new AdventureMapsRoutes();
