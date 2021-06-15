// BAD\
/*{
  class IPrice {
    price() {}
  }
  
  class Coffe extends IPrice {
    price() {
      return 10;
    }
  }
  
  class Sugar extends IPrice{
    price() {
      return 1;
    }
  } 
  
  class Milk extends IPrice{
    price() {
      return 5;
    }
  }
  
  class SoeMilk extends IPrice{
    price() {
      return 7;
    }
  }
  
  class CocosMilk extends IPrice{
    price() {
      return 15;
    }
  }
  
  const order = [new Coffe(), new SoeMilk(), new Sugar(), new CocosMilk()];
  let allPrice = 0;
  for(const itm of order) {
    allPrice += itm.price();
  }
}*/

// GOOD

class IPriceDecorator {

  price(parent) {
    return parent.price() + this.subPrice()
  }

  subPrice() {
    
  }
}

class Coffe extends IPriceDecorator {
  constructor(parent) {
    super(parent)
  }

  subPrice() {
    return 10;
  }
}
  
class Sugar extends IPriceDecorator {
  constructor(parent) {
    super(parent)
  }

  subPrice() {
    return 1;
  }
} 

class Milk extends IPriceDecorator {
  constructor(parent) {
    super(parent)
  }

  subPrice() {
    return 5;
  }
}

class SoeMilk extends IPriceDecorator {
  constructor(parent) {
    super(parent)
  }

  subPrice() {
    return 7;
  }
}

class CocosMilk extends IPriceDecorator {
  constructor(parent) {
    super(parent)
  }

  subPrice() {
    return 15;
  }
}

const priceAll = new Coffe(new Milk(new SoeMilk(new Sugar()))).price()