// 2) Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
  console.log(`I output only external context: ${this.item}`);
}
const obj = { item: "some value" };

logger.bind(obj)()
logger.call(obj)
logger.apply(obj)

// Бонус задание: Реализовать полифил(собственную функцию реализующую встроенную в js) метода
// bind()

Function.prototype.myBind = function (obj, ...args) {
  let func = this;
  return function (...newArgs) {
    func.apply(obj, [...args, ...newArgs]);
  };
};

logger.myBind(obj)()