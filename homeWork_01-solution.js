// Для выполнения задания создаем новую ветку в вашем репозитории с именованием - homeWork_01,
// после выполнения дз - прикрепляем ссылку к сдаче задания


// Задание 1 – Создать объект counter всеми возможными способами;

let counter;

counter = {};

counter = new Object();

counter = Object.create({});

counter = JSON.parse('{}');


// Задание 2 – Скопировать объект counter всеми
// возможными способами;

let counterCopy;

counterCopy = Object.create(counter);

counterCopy = Object.assign({}, counter);

counterCopy = { ...counter };

counterCopy = JSON.parse(JSON.stringify(counter));

const lodash = require('lodash');
counterCopy = lodash.cloneDeep(counter);


// Задание 3 – Создать функцию makeCounter всеми описанными и возможными способами;

function makeCounter() {
  console.log('Function Declaration');
};

makeCounter = function () {
  console.log('Function Expression');
};

makeCounter = function namedFunctionExpression(flag) {
  console.log('Named Function Expression');
};


// Бонус Задание 1 –
// Написать функцию глубокого сравнения двух объектов:

const Z = { childObjectKey: null };

const obj1 = {
  here: {
    is: "on",
    other: "3"
  },
  object: Z
};
const obj2 = {
  here: {
    is: "on",
    other: "2"
  },
  object: Z
};
const obj3 = {
  here: {
    is: "on",
    other: "3"
  },
  object: Z,
};

const deepEqual = (obj1, obj2) => {

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) return false;

  const isObject = (object) => {
    return object !== null && typeof object === "object";
  };

  for (var key of obj1Keys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if (
      isObjects && !deepEqual(value1, value2)
      || !isObjects && value1 !== value2
    ) return false;
  }
  return true;
};

// console.log(deepEqual(obj1, obj2));
// console.log(deepEqual(obj1, obj3));


// Бонус Задание 2 –
// Развернуть строку в обратном направлении при помощи методов массивов:

function reverseStr(str) {
  return str.split('').reverse().join("");
}

// let str = "qwertyuiop"
// console.log(str === reverseStr(reverseStr(str)), reverseStr(str));