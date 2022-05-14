import { Request, Response } from 'express';
import { Blocks } from '@models/Blocks';

export class BlocksController {

  public static async register(req: Request, res: Response): Promise<Response> {
    try {
      const document = await Blocks.create(req.body);
      document.save();

      return res.status(201).json({
        error: false,
        message: req.body.id + ' has been registered'
      });
    } catch (err) {
      return res.status(200).json({
        error: true,
        message: 'Block already registered'
      });
    }
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const document = await Blocks.findOne({ id: req.query.value });

    if(!document) {
      return res.status(200).json({
        error: true,
        message: req.query.value + ' cannot be deleted'
      });
    }

    document.delete();
    return res.status(200).json({
      error: false,
      message: req.query.value + ' has been deleted'
    });
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
      document = await Blocks.findOne({ metadata: { $elemMatch: { name: req.query.value } } }).select('-_id');
    }

    return res.status(200).json(document);
  }

  public static async getMetadataById(req: Request, res: Response): Promise<Response> {
    const document = await Blocks.findOne({ id: req.query.from }).select('-_id');

    if (document.metadata.length === 0) {
      return res.status(200).json({
        error: true,
        message: 'No metadata found'
      });
    }

    return res.status(200).json(document.metadata);
  }
}
