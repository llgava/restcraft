import { Request, Response } from 'express';

import { MiniGame } from '@schemas/MiniGame.schema';
import API from '@utils/API';

class MiniGamesController {

  /** Register a new mini game. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await MiniGame.create(req.body).then((mashUpPack) => {
      mashUpPack.save();
      return res.status(201).json(mashUpPack);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new mini game.' });
    });
  }

  /** Update a mini game by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await MiniGame.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Mini game not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a mini game by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await MiniGame.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Mini game not found.' }); }

    return res.status(200).json({ message: `The mini game with UUID ${document.uuid} was deleted.` });
  }

  /** List all mini games. */
  public async listAll(req: Request, res: Response) {
    await MiniGame.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all mini games.' });
    });
  }

  /** List a mini game by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await MiniGame.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Mini game not found.' }); }

    return res.status(200).json(document);
  }

  /** List a mini game by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await MiniGame.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Mini game not found.' }); }

    return res.status(200).json(document);
  }

  /** List all mini game by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await MiniGame.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any mini game yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new MiniGamesController();
