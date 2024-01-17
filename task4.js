// 4) Создать класс PersonThree c get и set для поля name и конструктором, 
// сделать класс наследник от класса Person.


class PersonThree {
  constructor() {
    this.name = null;
  }

  get personName() {
    console.log(`Текущее имя ${this.name}`);
    return this.name
  }

  set personName(value) {
    if (value.length < 3) {
      console.log(`Имя ${value} слишком короткое, должно быть более 2 символов`);
      return
    }
    this.name = value
    console.log(`Установлено имя ${this.name}`);
  }
}

const person3 = new PersonThree

person3.personName;
person3.personName = "Al";
person3.personName;
person3.personName = "Alex";
person3.personName;

class PersonFour extends PersonThree {
  #id

  constructor(id) {
    super()
    this.#id = id;
  }

  get personID() {
    console.log('ID: ', this.#id);
    return this.#id
  }

  get personData() {
    console.log(`Текущие ID = ${this.#id}, имя = ${this.name}`);
    return [this.#id, this.name]
  }
}

const person4 = new PersonFour(501)

person4.personName = "Felix";
person4.personName
person4.personData