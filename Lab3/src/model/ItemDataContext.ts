import Item from './entity/Item'
import ItemDto from './entity/ItemDto'

export default class ItemDataContext {
  private data: Map<string, Item>

  public constructor() {
    this.data = new Map<string, Item>()
  }

  private generateNextId() : string {
    return Math.random().toString(36).substr(2, 9)
  }

  public getById(id: string) : Item {
    const item = this.data.get(id)
    if (item === undefined) {
      throw new Error(`Not found item with id ${id}`)
    }
    return item;
  }

  public add(itemDto: ItemDto): Item {
    const item = new Item(this.generateNextId(), itemDto.name, itemDto.value)
    if (! item.isValid()) {
      throw new Error(`Try add invalid item to data context ${item.id} ${item.name} ${item.value}`)
    }
    this.data.set(item.id, item)
    return item;
  }

  public getAll() : IterableIterator<Item> {
    return this.data.values()
  }
}