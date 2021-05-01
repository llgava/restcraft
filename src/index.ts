import Server from './server';
import { Express } from 'express';

class MinecraftMarketplaceAPI {
  private app: Express = Server.app;

  constructor() {
    this.app.listen(3000, () => {
      console.log('Rodando na por 3000');
    });
  }
}

export default new MinecraftMarketplaceAPI();
