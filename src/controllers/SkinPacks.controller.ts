import { Request, Response } from 'express';

import { SkinPack } from '@schemas/SkinPack.schema';
import API from '@utils/API';

class SkinPacksController {

  /** Register a new skin pack. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await SkinPack.create(req.body).then((skinPack) => {
      skinPack.save();
      return res.status(201).json(skinPack);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new skin pack.' });
    });
  }

  /** Update a skin pack by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await SkinPack.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Skin pack not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a skin pack by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await SkinPack.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Skin pack not found.' }); }

    return res.status(200).json({ message: `The skin pack with UUID ${document.uuid} was deleted.` });
  }

  /** List all skin packs. */
  public async listAll(req: Request, res: Response) {
    await SkinPack.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all skin packs.' });
    });
  }

  /** List a skin pack by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await SkinPack.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Skin pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List a skin pack by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await SkinPack.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Skin pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List all skin pack by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await SkinPack.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any skin pack yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new SkinPacksController();
