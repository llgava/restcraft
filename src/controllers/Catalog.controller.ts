import { Request, Response } from 'express';
import { TexturePack } from '../schemas/TexturePack.schema';

class TexturePacksController {
  public async test(req: Request, res: Response) {
    const document = TexturePack.create(req.body);

    return res.status(201).json(document);
  }
}


export default new TexturePacksController();
