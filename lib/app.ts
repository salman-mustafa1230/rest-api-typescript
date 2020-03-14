import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/userRoutes";
import * as mongoose from "mongoose";
import { ConstantNamespace } from "./../config/constant";

interface Error {
    status?: number;
    message?: string;
  }
class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = ConstantNamespace.dbUri;;
    constructor() {
        
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app); 
        this.errorHandler();    
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
        db.on('error', function(error) {
            console.error('Error in MongoDb connection: ' + error);
            mongoose.disconnect();
          });
          db.on('connected', function() {
            console.log('MongoDB connected!');
          });
          db.once('open', () => {
            console.log('MongoDB connection opened!');
          });
          db.on('reconnected', function () {
            console.log('MongoDB reconnected!');
          });        
    }

    private errorHandler() {
        this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || 500);
            res.json( {
              message: err.message,
              error: err
            });
          });
    }

}

export default new App().app;
