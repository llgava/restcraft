import { Request, Response } from 'express';

import { SurvivalSpawn } from '@schemas/SurvivalSpawn.schema';
import API from '@utils/API';

class SurvivalSpawnsController {

  /** Register a new survival spawn. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await SurvivalSpawn.create(req.body).then((survivalSpawn) => {
      survivalSpawn.save();
      return res.status(201).json(survivalSpawn);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new survival spawn.' });
    });
  }

  /** Update a survival spawn by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await SurvivalSpawn.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Survival spawn not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a survival spawn by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await SurvivalSpawn.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Survival spawn not found.' }); }

    return res.status(200).json({ message: `The survival spawn with UUID ${document.uuid} was deleted.` });
  }

  /** List all survival spawns. */
  public async listAll(req: Request, res: Response) {
    await SurvivalSpawn.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all survival spawns.' });
    });
  }

  /** List a survival spawn by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await SurvivalSpawn.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Survival spawn not found.' }); }

    return res.status(200).json(document);
  }

  /** List a survival spawn by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await SurvivalSpawn.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Survival spawn not found.' }); }

    return res.status(200).json(document);
  }

  /** List all survival spawn by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await SurvivalSpawn.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any survival spawn yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new SurvivalSpawnsController();
