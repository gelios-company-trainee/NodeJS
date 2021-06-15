import express from 'express'
import bodyParser from 'body-parser'
import ItemDataContext from '../model/ItemDataContext'
import ItemDto from '../model/entity/ItemDto';

export default class ItemController {
  public path = '/items';
  public router = express.Router();

  constructor(private itemDataContext : ItemDataContext) {
    this.router.use(bodyParser.json())
    this.router.get(this.path, this.getAll);
    this.router.get(`${this.path}/:id`, this.getById);
    this.router.post(`${this.path}`, this.postNew);
  }

  private getAll = (req: express.Request, res: express.Response) => {
    try {
      const itr = this.itemDataContext.getAll();
      res.send(Array.from(itr));
    } catch (err) {
      res.status(500).send({message: (err as Error)?.message || 'unexpected server internal error'})
    }
  }

  private getById = (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;
      if (! id) {
        throw new Error('Invalid parameter id');
      }

      const item = this.itemDataContext.getById(id);

      res.send(item);
    } catch (err) {
      res.status(500).send({message: (err as Error)?.message || 'unexpected server internal error'})
    }
  }

  private postNew = (req: express.Request, res: express.Response) => {
    try {
      const itemDto = new ItemDto(req.body.name, req.body.value);

      const item = this.itemDataContext.add(itemDto);

      res.send(item);
    } catch (err) {
      res.status(500).send({message: (err as Error)?.message || 'unexpected server internal error'})
    }
  }
}