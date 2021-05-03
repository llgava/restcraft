import { Request, Response } from 'express';

import { TexturePack } from '@schemas/TexturePack.schema';
import API from '@utils/API';

class TexturePacksController {

  /** Register a new texture pack. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await TexturePack.create(req.body).then((texturePack) => {
      texturePack.save();
      return res.status(201).json(texturePack);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new texture packs.' });
    });
  }

  /** Update a texture pack by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await TexturePack.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Texture pack not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a texture pack by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await TexturePack.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Texture pack not found.' }); }

    return res.status(200).json({ message: `The texture pack with UUID ${document.uuid} was deleted.` });
  }

  /** List all texture packs. */
  public async listAll(req: Request, res: Response) {
    await TexturePack.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all texture packs.' });
    });
  }

  /** List a texture pack by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await TexturePack.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Texture pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List a texture pack by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await TexturePack.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Texture pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List all texture pack by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await TexturePack.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any texture pack yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new TexturePacksController();
