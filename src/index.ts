import Server from './server';
import Chalk from 'chalk';
import { Express } from 'express';

class MinecraftMarketplaceAPI {
  private app: Express = Server.app;

  constructor() {
    this.app.listen(process.env.PORT, () => {
      console.log(`${Chalk.bold.green('✔')} The application has started.`);
    });
  }
}

export default new MinecraftMarketplaceAPI();
