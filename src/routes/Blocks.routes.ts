import { Router } from 'express';
import { BlocksController } from '@controllers/Blocks.controller';

class BlocksRoutes {
  public router: Router;

  constructor() {
    this.router = Router();

    this.router.post('/blocks', BlocksController.register);
    this.router.get('/blocks', BlocksController.getAll);
    this.router.get('/blocks/id', BlocksController.getById);
    this.router.get('/blocks/name', BlocksController.getByName);
    this.router.get('/blocks/metadata', BlocksController.getMetadataById);
  }
}

export default new BlocksRoutes();
