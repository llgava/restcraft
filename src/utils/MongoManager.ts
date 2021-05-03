import Chalk from 'chalk';
import mongoose, { ConnectOptions } from 'mongoose';

export class MongoManager {
  private mongoOptions: ConnectOptions;

  constructor() {
    this.mongoOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
  }

  /** Creates a connection to a mongoDB database. */
  public async connect(uri: string) {
    console.clear();

    await mongoose.connect(uri, this.mongoOptions).then((db) => {
      console.log(`${Chalk.bold.green('✔')} Successfully connected to the ${db.connection.name} database.`);
    }).catch(() => {
      console.log(`${Chalk.bold.red('X')} Error when trying to connect to MongoDB, check your ConnectionURI.`);
    });

    mongoose.Promise = global.Promise;
  }

  /** Closes the connection to the MongoDB database. */
  public close(force?: boolean) {
    return mongoose.connection.close(force);
  }
}
