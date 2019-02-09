/**
 * Класс, объекты которого описывают параметры гамбургера.
 *
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */



function Hamburger(size, stuffing) {
  
  if (size === undefined){
    throw new HamburgerException('You must enter size');
  }

  if (!size.size){
    throw new HamburgerException('You must enter valid size');
  }

  if (stuffing === undefined){
    throw new HamburgerException('You must enter stuffing')
  }

  this.size = size.size;
  this.stuffing = stuffing.name ;
  this.topping = [];

  this.price = size.price + stuffing.price;
  this.calories = size.calories + stuffing.calories;

}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL =      {size:'small',price:50, calories:20};
Hamburger.SIZE_LARGE =      {size:'big', price:100, calories:40};
Hamburger.STUFFING_CHEESE = {name:'cheese', price:10, calories:20};
Hamburger.STUFFING_SALAD =  {name:'salad', price:20, calories:5};
Hamburger.STUFFING_POTATO = {name:'potato', price:15, calories:10};
Hamburger.TOPPING_MAYO =    {name:'mayo', price:20, calories:5};
Hamburger.TOPPING_SPICE =   {name:'spice', price:15, calories:0};

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 *
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function(topping) {
  if (!this.topping.find((item)=>{return item === topping.name})){
    this.topping.push(topping.name);
    this.price += topping.price;
    this.calories += topping.calories;
  }else {
    throw new HamburgerException('This topping is already included');
  }
};




/**
 * Убрать добавку, при условии, что она ранее была
 * добавлена.
 *
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
  if (this.topping.length > 0){
    let index = this.topping.indexOf(this.topping.find((item)=>{return item === topping.name}))
    this.topping.splice(index,1)
    this.price -= topping.price;
    this.calories -= topping.calories;
  }else {
    throw new HamburgerException('Toppings are empty')
  }
};

// let a = new Hamburger(Hamburger.SIZE_SMALL,Hamburger.STUFFING_SALAD);
// a.addTopping(Hamburger.STUFFING_SALAD);
// a.addTopping(Hamburger.STUFFING_POTATO);
// a.removeTopping(Hamburger.STUFFING_POTATO);
// console.log(a);
// console.log(a.price);



/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function() {
  return this.topping
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function (){
  return this.size
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function (){
  return this.stuffing
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
Hamburger.prototype.calculatePrice = function(){
    return this.price
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function(){
  return this.calories
};


/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
function HamburgerException(message){
  this.name = 'HamburgerException';
  this.message = `${this.name}: ${message}`;
}


HamburgerException.prototype = Object.create(Error.prototype);


// маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер?
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE.size); // -> false
// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1
// не передали обязательные параметры
let h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
let h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
let h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'
