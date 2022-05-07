import chalk from 'chalk';
import Server from './server';

Server.app.listen(process.env.PORT, () => {
  console.log(`${chalk.bold.green('✔')} The application has started.`);
});
