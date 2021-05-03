import { Request, Response } from 'express';

import { MashUpPack } from '@schemas/MashUpPack.schema';
import API from '@utils/API';

class MashUpPacksController {

  /** Register a new mash-up pack. */
  public async register(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    await MashUpPack.create(req.body).then((mashUpPack) => {
      mashUpPack.save();
      return res.status(201).json(mashUpPack);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to register a new mash-up pack.' });
    });
  }

  /** Update a mash-up pack by UUID. */
  public async update(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await MashUpPack.findOneAndUpdate({ uuid: req.params.uuid }, req.body, { new: true });

    if (!document) { return res.status(400).json({ message: 'Mash-Up pack not found.' }); }

    return res.status(200).json(document);
  }

  /** Delete a mash-up pack by UUID. */
  public async delete(req: Request, res: Response) {
    if (!API.checkBearerToken(req, res)) { return; }

    const document = await MashUpPack.findOneAndDelete({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Mash-Up pack not found.' }); }

    return res.status(200).json({ message: `The mash-up pack with UUID ${document.uuid} was deleted.` });
  }

  /** List all mash-up packs. */
  public async listAll(req: Request, res: Response) {
    await MashUpPack.find().then((documents) => {
      return res.status(200).json(documents);
    }).catch(() => {
      return res.status(400).json({ message: 'An error occurred when trying to list all mash-up packs.' });
    });
  }

  /** List a mash-up pack by UUID. */
  public async listByUUID(req: Request, res: Response) {
    const document = await MashUpPack.findOne({ uuid: req.params.uuid });

    if (!document) { return res.status(400).json({ message: 'Mash-Up pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List a mash-up pack by title. */
  public async listByTitle(req: Request, res: Response) {
    const document = await MashUpPack.findOne({ title: req.params.title });

    if (!document) { return res.status(400).json({ message: 'Mash-Up pack not found.' }); }

    return res.status(200).json(document);
  }

  /** List all mash-up pack by a creator. */
  public async listByCreator(req: Request, res: Response) {
    const documents = await MashUpPack.find({ creator: req.params.creator });

    if (documents.length === 0) { return res.status(400).json({ message: 'This creator has not published any mash-up pack yet.' }); }

    return res.status(200).json(documents);
  }
}

export default new MashUpPacksController();
