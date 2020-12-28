import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Routes } from './routes';

import * as mongoose from 'mongoose';

require('dotenv-safe').config();

class App {
  public app: express.Application; 
  public routeApi: Routes = new Routes();

  public mongoUrl: string = 'mongodb://localhost:55000/apits';

  constructor() {
    this.app = express();
    this.config();
    this.routeApi.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
  }
}

export default new App().app;
