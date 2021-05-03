import { Request, Response } from 'express';

import { AdventureMap } from '@schemas/AdventureMap.schema';
import API from '@utils/API';

class AdventureMapsController {

  /** Register a new adventure map. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await AdventureMap.create(req.body).then((adventureMap) => {
      adventureMap.save();
      return res.status(201).json(adventureMap);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new adventure map.' });
    });
  }

  /** Update a adventure map by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await AdventureMap.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Adventure map not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a adventure map by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await AdventureMap.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Adventure map not found.' }); }

    return res.status(200).json({ message: `The adventure map with UUID ${document.uuid} was deleted.` });
  }

  /** List all adventure maps. */
  public async listAll(req: Request, res: Response) {
    await AdventureMap.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all adventure maps.' });
    });
  }

  /** List a adventure map by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await AdventureMap.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Adventure map not found.' }); }

    return res.status(200).json(document);
  }

  /** List a adventure map by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await AdventureMap.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Adventure map not found.' }); }

    return res.status(200).json(document);
  }

  /** List all adventure map by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await AdventureMap.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any adventure map yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new AdventureMapsController();
