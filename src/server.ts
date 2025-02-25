import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);

    app.listen(config.port, () => {
      console.log(`First-Project App listening on port ${config.port}!`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();
