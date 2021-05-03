import { Request, Response } from 'express';

class API {

  /**
   * Checks if the header authorization receive
   * the Bearer token and if is a valid token.
   */
  public async checkBearerToken(req: Request | any, res: Response | any) {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'No token provided.' });
      return false;
    }

    const [prefix, token] = req.headers.authorization.split(' ');

    if (prefix !== 'Bearer') {
      res.status(401).send({ message: 'Token malformatted.' });
      return false;
    }

    if (token !== process.env.BEARER_TOKEN) {
      res.status(401).send({ message: 'The token is invalid.' });
      return false;
    }

    return true;
  }
}

export default new API();
