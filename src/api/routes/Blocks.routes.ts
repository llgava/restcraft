import { Router } from 'express';
import { BlocksController } from '@controllers/Blocks.controller';

export class BlocksRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();

    this._router.post('/blocks', BlocksController.register);
    this._router.delete('/blocks', BlocksController.delete);
    this._router.get('/blocks', BlocksController.getAll);
    this._router.get('/blocks/id', BlocksController.getById);
    this._router.get('/blocks/name', BlocksController.getByName);
    this._router.get('/blocks/metadata', BlocksController.getMetadataById);
  }

  public get getRouter() { return this._router; }
}
