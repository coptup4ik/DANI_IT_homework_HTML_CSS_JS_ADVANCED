class Hamburger {
  constructor(type, stuffing) {
    this._size = '';
    this._price = 0;
    this._calories = 0;
    this._stuffing = '';
    this._topping = [];
    this._setPriceAndStuffing(type, stuffing);
  }

  _setPriceAndStuffing(obj1, obj2) {
    try {
      if (!obj1) {
        throw new HamburgerException('no size given')
      } else if (typeof obj1 !== 'object') {
        throw new HamburgerException('incorrect data type');
      } else if (!obj1.size) {
        throw new HamburgerException('no size data')
      } else if (obj1.size.toLowerCase() !== 'small' && obj1.size.toLowerCase() !== 'big') {
        throw new HamburgerException(`size is incorrect : ${obj1.size}`)
      }


      if (!obj2) {
        throw new HamburgerException('no stuffing given')
      } else if (typeof obj2 !== 'object') {
        throw new HamburgerException('incorrect data type');
      }

      this._size = obj1.size;
      this._stuffing = obj2.name;
      this._price = obj1.price + obj2.price;
      this._calories = obj1.calories + obj2.calories

    } catch (e) {
      throw new HamburgerException(e.message)
    }
  }

  addTopping(topping) {
    if (!this._topping.find((item) => {
      return item === topping.name
    })) {
      this._topping.push(topping.name);
      this._price += topping.price;
      this._calories += topping.calories;
    } else {
      throw new HamburgerException('This topping is already included');
    }
  }

  removeTopping(topping) {
    if (this._topping.length > 0) {
      let index = this._topping.indexOf(this._topping.find((item) => {
        return item === topping.name
      }));
      this._topping.splice(index, 1);
      this._price -= topping.price;
      this._calories -= topping.calories;
    } else {
      throw new HamburgerException('Toppings are empty')
    }
  }

  getToppings() {
    return this._topping
  };

  getSize(){
    return this._size
  };

  getStuffing(){
    return this._stuffing
  };

  calculatePrice(){
    return this._price
  };

  calculateCalories(){
    return this._calories
  };
}


class HamburgerException extends Error {
  constructor(message){
    super();
    this.name = 'HamburgerException';
    this.message = message;
  }
}


Hamburger.SIZE_SMALL = {size: 'small', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {size: 'big', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'potato', price: 15, calories: 10};
Hamburger.TOPPING_MAYO = {name: 'mayo', price: 20, calories: 5};
Hamburger.TOPPING_SPICE = {name: 'spice', price: 15, calories: 0};


// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// // добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// // спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// // сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// // я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// // А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// // Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE.size); // -> false
// // Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1
// // не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given
// // передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// // => HamburgerException: invalid size 'TOPPING_SAUCE'
//
// // добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// // HamburgerException: duplicate topping 'TOPPING_MAYO'
