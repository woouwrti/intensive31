// 3) Создать объект Person несколькими способами, 
// после создать объект Person2, 
// чтобы в нём были доступны методы объекта Person. 
// Добавить метод logInfo чтоб он был доступен всем объектам. 

let person = {
  name: "Basil",
  id: 301,
  getInfo: function() {
    return [this.id, this.name]
  }
}

console.log(...person.getInfo());

function Person(name, id) {
  this.name = name || null;
  this.id = id || null;
};

person = new Person('Evan', 302)

const person2 = {}
Object.setPrototypeOf(person2, Person.prototype)
person2.name = 'Nikky';
person2.id = 303;

Person.prototype.logInfo = function () {
  console.log(`ID: ${this.id}, имя: ${this.name}`);
}

person.logInfo()
person2.logInfo()