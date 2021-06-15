const store = [
  {type: 0, data: {}}, {type: 1, data: {}}
]

// MODEL BEGIN
class Product {
  GetName() {}
}

class ConcreteProductA extends Product {
  GetName() {
    return 'ProductA'
  }
}

class ConcreteProductB extends Product {
  GetName() {
    return 'ProductB'
  }
}
// MODEL END

//builder

class Item {
  load() { 

  }
  config() {

  }
  connect() {

  }
  disconnect() {

  }
}

class ItemBuilder {
 
  load() { 
    this._item = new Item();
    this._item.load();
    //TODO LOGIC
    return this;
  }
  config() {
    this._item.config();
     //TODO LOGIC
    return this;
  }
  connect() {
    this._item.connect();
     //TODO LOGIC
    return this;
  }

  get() {
    return this._item
  }

} 


const item = new ItemBuilder().load().config().connect().get();

// ....

// FACTORY
class Creator {
  FactoryMethod() {}
}

class ConcreteCreatorA extends Creator {
  FactoryMethod() {
      return new ConcreteProductA()
  }
}

class ConcreteCreatorB extends Creator {
  FactoryMethod() {
      return new ConcreteProductB()
  }
}

class Factory {
  constructor() {
    this._creators = new Map();
    this._creators.set(0, new ConcreteCreatorA());
    this._creators.set(1, new ConcreteCreatorB());
  }

  createProducts(data) {
    return data.map((value) => {
      if (! this._creators.has(value.type)) {
        throw new Error(`Not found creator for type ${value.type}`);
      }
      
      return this._creators.get(value.type).FactoryMethod();
    })
  }
}

// Client
{
  const factory = new Factory();
  const model = factory.createProducts(store);
  console.log('model', model);
}


// Abstract factory

class AbstractFactory {
  constructor() {
    this._typesMap = new Map();
  }

  add(id, type) {
    this._typesMap.set(id, type);
  }

  create(data) {
    return data.map((value) => {
      if (! this._typesMap.has(value.type)) {
        throw new Error(`Not found creator for type ${id}`);
      }
      const type = this._typesMap.get(value.type);
      return new type();
    })
  }
}

// Client
{
  const aFactory = new AbstractFactory();
  aFactory.add(0, ConcreteCreatorA)
  aFactory.add(1, ConcreteCreatorB)
  
  
  const model = aFactory.create(store);
  console.log('model', model);
}


/*
// An array of creators
const creators = [ new ConcreteCreatorA(), new ConcreteCreatorB() ]
const products = []

// Iterate over creators and create products
for (let creator of creators) {
  products.push(creator.FactoryMethod().GetName())
}

console.log(products)
*/