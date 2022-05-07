import chalk from 'chalk';
import mongoose from 'mongoose';

export class MongoManager {

  public static async connect(uri: string) {
    console.clear();

    await mongoose.connect(uri).then((db) => {
      console.log(`${chalk.bold.green('✔')} Successfully connected to the ${db.connection.name} database`);
    }).catch(() => {
      console.log(`${chalk.bold.red('X')} Error when trying to connect to MongoDB, check your MONGO_URI at .env`);
    });

    mongoose.Promise = global.Promise;
  }

  public static close(force?: boolean) {
    return mongoose.connection.close(force);
  }
}
