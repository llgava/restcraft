import { Request, Response } from 'express';

import { TexturePack } from '@schemas/TexturePack.schema';

class TexturePacksController {

  /** Register a new texture pack. */
  public async register(req: Request, res: Response) {
    const document = await TexturePack.create(req.body);

    return res.status(201).json(document);
  }

  /** Update a texture pack by UUID. */
  public async update(req: Request, res: Response) {
    const document = await TexturePack.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    return res.status(200).json(document);
  }

  /** List all texture packs. */
  public async listAll(req: Request, res: Response) {
    const documents = await TexturePack.find();

    return res.status(200).json(documents);
  }

  /** List a texture pack by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await TexturePack.findOne({ uuid: req.params.uuid });

    return res.status(200).json(document);
  }

  /** List a texture pack by Title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await TexturePack.findOne({ title: req.params.title });

    return res.status(200).json(document);
  }

  /** List a texture pack by Creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await TexturePack.find({ creator: req.params.creator });

    return res.status(200).json(documents);
  }
}

export default new TexturePacksController();
