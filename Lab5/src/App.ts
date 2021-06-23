import express from 'express'
import AuthController from './controllers/AuthController';
import DbContext from './model/DbContext';
import UserDbContext from './model/UserDbContext';

export default class App {
  public app: express.Application;
  public dbContext: DbContext;

  constructor() {
    this.app = express();
    this.dbContext = new DbContext();
  }

  public initialize() {
    const userDbContext = new UserDbContext();
    const controller = new AuthController(userDbContext);

    this.app.use('/', controller.router);
  }

  public async listen(ip: string, port: number) {
    await this.dbContext.connectAsync('mongodb://localhost:27017/users-db');
    this.app.listen(port, ip, ( ) => {
      console.log(`App listening on the port ${ip}:${port}`);
    })
  }
}