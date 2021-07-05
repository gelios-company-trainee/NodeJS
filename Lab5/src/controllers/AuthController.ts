import express from 'express'
import bodyParser from 'body-parser'
import UserDbContext from '../model/UserDbContext'
import UserDto from '../model/entity/UserDto';

export default class AuthController {
  public path = '/auth';
  public router = express.Router();

  constructor(private userDbContext : UserDbContext) {
    this.router.use(bodyParser.json())
    this.router.get(`${this.path}/token/:token`, this.getByToken);
    this.router.get(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/create`, this.create);

    this.router.get(`${this.path}/test`, this.test);
    this.router.get(`${this.path}/test2`, this.test2);
  }
 
  test = async (req: express.Request, res: express.Response) => {
    let limit = 0;
    if (req.query.limit) {
      limit = Number.parseInt(req.query.limit.toString());
    }
   
    let offset = 0;
    if (req.query.offset) {
      offset = Number.parseInt(req.query.offset.toString());
    }

    res.send(await this.userDbContext.getAllAsync(offset, limit))
  }

  test2 = async (req: express.Request, res: express.Response) => {
    let page = 0;
    if (req.query.page) {
      page = Number.parseInt(req.query.page.toString());
    }
 
    const pageSize = 50;
    const offset = page * pageSize;

    res.send(await this.userDbContext.getAllAsync(offset, pageSize))
  }

  getByToken = async (req: express.Request, res: express.Response) => {
    try {
      const token = req.params.token;
      const user = await this.userDbContext.getByToken(token);
      res.send(user);
    } catch (err) {
      res.status(404).send({message: 'invalid token'});
    }
  }

  login = async (req: express.Request, res: express.Response) => {
    try {
      const authorization = req.header('Authorization');

      const splitData = authorization?.split(' ');

      if (! splitData) {
        throw new Error('invalid Authorization header')
      }

      if (splitData[0] != 'Basic') {
        throw new Error('invalid Authorization header')
      }

      const loginData = Buffer.from(splitData[1], 'base64').toString('utf-8');

      const emailAndPassword = loginData.split(':');

      const email = emailAndPassword[0] || '';
      const pass  = emailAndPassword[1] || '';

      const user = await this.userDbContext.getByEmailAndPasswordAsync(email, pass);
      res.send(user);
    } catch (err) {
      res.status(404).send({message: 'invalid email or password'});
    }
  }

  create = async (req: express.Request, res: express.Response) => {
    try {
      const userDto = req.body as UserDto;

      if (userDto.email == '' || userDto.name == '' || userDto.password == '') {
        throw new Error('Invalid UserDto date');
      }

      if (await this.userDbContext.getByEmailAsync(userDto.email)) {
        throw new Error('User with email already exits')
      }

      const user = await this.userDbContext.addNewUserAsync(userDto);
      res.send(user);
    } catch (err) {
      res.status(404).send({message: 'invalid token'});
    }
  }
}