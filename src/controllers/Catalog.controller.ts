import { Request, Response } from 'express';

import { Catalog } from '@schemas/Catalog.schema';

class CatalogController {
  public async test(req: Request, res: Response) {
    return res.status(200).json({ message: 'Worked!' });
  }
}


export default new CatalogController();
