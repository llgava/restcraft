import { Router } from 'express';

import MiniGamesController from '@controllers/MiniGames.controller';

class MiniGamesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/mini-games', MiniGamesController.register);
    this.router.put('/mini-games/update/:uuid', MiniGamesController.update);
    this.router.delete('/mini-games/delete/:uuid', MiniGamesController.delete);
    this.router.get('/mini-games', MiniGamesController.listAll);
    this.router.get('/mini-games/uuid/:uuid', MiniGamesController.listByUUID);
    this.router.get('/mini-games/title/:title', MiniGamesController.listByTitle);
    this.router.get('/mini-games/creator/:creator', MiniGamesController.listByCreator);
  }
}

export default new MiniGamesRoutes();
