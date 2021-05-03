import { Router } from 'express';

import SurvivalSpawnsController from '@controllers/SurvivalSpawns.controller';

class SurvivalSpawnsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/survival-spawns', SurvivalSpawnsController.register);
    this.router.put('/survival-spawns/update/:uuid', SurvivalSpawnsController.update);
    this.router.delete('/survival-spawns/delete/:uuid', SurvivalSpawnsController.delete);
    this.router.get('/survival-spawns', SurvivalSpawnsController.listAll);
    this.router.get('/survival-spawns/uuid/:uuid', SurvivalSpawnsController.listByUUID);
    this.router.get('/survival-spawns/title/:title', SurvivalSpawnsController.listByTitle);
    this.router.get('/survival-spawns/creator/:creator', SurvivalSpawnsController.listByCreator);
  }
}

export default new SurvivalSpawnsRoutes();
