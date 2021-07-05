const str: string = "";
let ptr: any = 0;
let ptr2: number = 0;
let array: Array<string|number> = ['dd', 2];

enum MyEnum {
  kEntity = 0,
  kInsert = 1
}

class MyClass {
  public m_a: string;

  private m_priv: number;
  protected  m_protected: number;

  constructor(a: string) {
    this.m_a = a;
    this.m_priv = 0;
    this.m_protected = 1;
  }
}

class MyClassNext extends MyClass {
  constructor(a: string) {
    super(a);
    this.m_protected = 1;
  }
}

const myClass = new MyClass('');

interface IAnimal {
  move(x: number, y: number) : boolean;
}

interface INamed {
  getName() : string;
}

class AnimalImpl implements IAnimal, INamed {
  getName(): string {
    throw new Error("Method not implemented.");
  }
  
  move(x: number, y: number): boolean {
    throw new Error("Method not implemented.");
  }

  get() {

  }
}

class AnimalImpl2 implements IAnimal, INamed {
  getName(): string {
    throw new Error("Method not implemented.");
  }
  
  move(x: number, y: number): boolean {
    throw new Error("Method not implemented.");
  }

}

const data: Array<IAnimal> = [new AnimalImpl, new AnimalImpl2];

function subMove(animal: IAnimal) {
  const animalImpl = animal as AnimalImpl;
  animalImpl.get()
}

subMove(data[0])


interface DatabaseCtx {
  getAll(): Array<IAnimal>;
}

class SqlDatabaseCtx implements DatabaseCtx {
  getAll(): IAnimal[] {
    throw new Error("Method not implemented.");
  }
}

class MongoDatabaseCtx implements DatabaseCtx {
  getAll(): IAnimal[] {
    throw new Error("Method not implemented.");
  }
} 

class FileDatabaseCtx implements DatabaseCtx {
  getAll(): IAnimal[] {
    throw new Error("Method not implemented.");
  }
}

class IrdgnDatabaseCtx {

}

class MyClass3 {
  constructor(public a: string) {

  }
}

class MyClassGeneric<Type extends SqlDatabaseCtx> {

}

const t = new MyClassGeneric<SqlDatabaseCtx>()