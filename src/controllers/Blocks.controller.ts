import { Request, Response } from 'express';
import { Blocks } from '../schemas/Blocks';

export class BlocksController {
  public static async getAll(req: Request, res: Response): Promise<Response> {
    const documents = await Blocks.find();

    return res.status(200).json(documents);
  }
}
