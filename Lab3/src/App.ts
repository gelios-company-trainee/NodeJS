import express from 'express'
import ItemController from './controllers/ItemController';
import ItemDataContext from './model/ItemDataContext';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public initialize() {
    const itemDataContext = new ItemDataContext();
    const controller = new ItemController(itemDataContext);

    this.app.use('/', controller.router);
  }

  public listen(ip: string, port: number) {
    this.app.listen(port, ip, ( ) => {
      console.log(`App listening on the port ${ip}:${port}`);
    })
  }
}