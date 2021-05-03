import { Request, Response } from 'express';

import { SurvivalPack } from '@schemas/SurvivalPack.schema';
import API from '@utils/API';

class SurvivalPacksController {

  /** Register a new survival pack. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await SurvivalPack.create(req.body).then((mashUpPack) => {
      mashUpPack.save();
      return res.status(201).json(mashUpPack);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new survival pack.' });
    });
  }

  /** Update a survival pack by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await SurvivalPack.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Survival pack not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a survival pack by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await SurvivalPack.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Survival pack not found.' }); }

    return res.status(200).json({ message: `The survival pack with UUID ${document.uuid} was deleted.` });
  }

  /** List all survival packs. */
  public async listAll(req: Request, res: Response) {
    await SurvivalPack.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all survival packs.' });
    });
  }

  /** List a survival pack by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await SurvivalPack.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Survival pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List a survival pack by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await SurvivalPack.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Survival pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List all survival pack by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await SurvivalPack.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any survival pack yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new SurvivalPacksController();
