import { Router } from 'express';
import { BlocksController } from '../controllers/Blocks.controller';

class BlocksRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/blocks', BlocksController.getAll);
  }
}

export default new BlocksRoutes();
