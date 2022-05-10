import { Request, Response } from 'express';
import { Blocks } from '@schemas/Blocks';

export class BlocksController {

  public static async register(req: Request, res: Response): Promise<Response> {
    const document = await Blocks.create(req.body);

    document.save();
    return res.status(201).json(document);
  }

  public static async getAll(req: Request, res: Response): Promise<Response> {
    const documents = await Blocks.find().select('-_id');

    return res.status(200).json(documents);
  }

  public static async getById(req: Request, res: Response): Promise<Response> {
    let document = await Blocks.findOne({ id: req.query.value }).select('-_id');

    return res.status(200).json(document);
  }

  public static async getByName(req: Request, res: Response): Promise<Response> {
    let document = await Blocks.findOne({ name: req.query.value }).select('-_id');

    if (!document) {
      document = await Blocks.findOne({ metadata: { $elemMatch: { name: req.query.value } } });
    }

    return res.status(200).json(document);
  }

  public static async getMetadataById(req: Request, res: Response): Promise<Response> {
    const document = await Blocks.findOne({ id: req.query.from }).select('-_id');

    if (document.metadata.length === 0) {
      return res.status(200).json({
        message: 'No metadata found'
      });
    }

    return res.status(200).json(document.metadata);
  }
}
