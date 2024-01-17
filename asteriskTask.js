/*
Задание "со звёздочкой": (asteriskTask.js)

1) Сначала без запуска подумайте какой будет порядок вывода в консоль
2) Скопируйте и запустите код в любой консоли
3) А дальше прикрепите к дз подробное обьяснение по шагам о работе эвент лупа в этом коде и собственно объяснение почему выведется именно в таком порядке

Promise.resolve()
  .then(() => console.log("a: 1"))
  .then(() => {
    setTimeout(() => console.log("timeout 2"));
    console.log("a: 2");
  })
  .then(() => {
    setTimeout(() => console.log("timeout 3"));
    console.log("a: 3");
  });

new Promise((res, rej) => {
  console.log("b");
  rej(new Error("123"));
})
  .then(console.log("b 1"))
  .then(
    () => console.log("b 2"),
    () => console.log("b")
  )
  .catch(() => console.log("b 3"))
  .then(() => console.log("b 4"));
*/



// Сначала отметим важные для нас точки: 
Promise.resolve() // Первый (1) промис
  .then(() => console.log("a: 1")) // (1.1)
  .then(() => { // (1.2)
    setTimeout(() => console.log("timeout 2"));
    console.log("a: 2");
  })
  .then(() => { // (1.3)
    setTimeout(() => console.log("timeout 3"));
    console.log("a: 3");
  });

new Promise((res, rej) => { // Второй (2) промис
  console.log("b");
  rej(new Error("123"));
})
  .then(console.log("b 1")) // (2.1)
  .then( // (2.2)
    () => console.log("b 2"),
    () => console.log("b")
  )
  .catch(() => console.log("b 3")) // (2.3)
  .then(() => console.log("b 4")); // (2.4)

// Обозначим "microtask queue" как MIQ и "macrotask queue" как MAQ

// Рассмотрим программу с самого начала.

// Движок начнет синхронно выполнять код
// и первым будет инициализирован первый (1) промис:
Promise.resolve() // (1)

// далее в MIQ будет добавлен первый (1.1) then первого метода
//
// MIQ [
//  .then(() => console.log("a: 1")) // (1.1)
// ]

// затем произойдет создание второго (2) промиса:
new Promise((res, rej) => { // (2) 
  console.log("b"); // b
  rej(new Error("123")); // примет состояние <rejected>
})

// в консоль будет выведена строка "b"
//
// console [
//  b
// ]
//
// и дойдя до rej() промис (2) примет состояние <rejected>
// а в MIQ будет добавлен первый (2.1) then второго (2) промиса
//
// MIQ [
//  .then(() => console.log("a: 1")) // (1.1)
//  .then(console.log("b 1")) // (2.1)
// ]
//
// при этом аргумент (2.1) then`а и будет вызван сразу же
//
// console [
//  b
//  b 1
// ]

// на этом выполнение синхронных функций будет окончено 
// и движок перейдет к MIQ, забрав из него первый элемент
Promise.resolve() // Первый (1) промис
  .then(() => console.log("a: 1")) // (1.1)

// т.е. первый (1.1) then первого метода будет исполнен
// в консоль попадет "a: 1"
//
// console [
//  b
//  b 1
//  a: 1
// ]
//
// а в конец MIQ добавлен следующий (1.2) then
//
// MIQ [
//  .then(console.log("b 1")) // (2.1)
//  .then(() => { // (1.2)
// ]

// берем (2.1) из MIQ
new Promise((res, rej) => { // Второй (2) промис
  // ...
})
  .then(console.log("b 1")) // (2.1)

// (2.1) не содержит в аргументе функций обратного вызова 
// и будет пропущен, а промис передан далее.
// добавляем (2.2) в MIQ 
//
// MIQ [
//  .then(() => { // (1.2)
//  .then(() => { // (2.2)
// ]

// и исполняем первого в очереди, т.е. (1.2)
Promise.resolve() // Первый (1) промис
  // ...
  .then(() => { // (1.2)
    setTimeout(() => console.log("timeout 2"));
    console.log("a: 2");
  })

// setTimeout(() => console.log("timeout 2")) будет добавлен в MAQ
//
// MAQ [
//  setTimeout(() => console.log("timeout 2"))
// ]
//
// и в консоль выведется "a: 2"
//
// console [
//  b
//  b 1
//  a: 1
//  a: 2
// ]
//
// добавляем (1.3) в MIQ 
// MIQ [ (2.2), (1.3) ]

// исполняем (2.2)
new Promise((res, rej) => { // Второй (2) промис
  // ...
})
  // ...
  .then( // (2.2)
    () => console.log("b 2"),
    () => console.log("b")
  )

// второй (2) промис на текущий момент имеет состояние <rejected>
// поэтому будет выполнен onReject callback, 
// т.е. () => console.log("b")
//
// console [
//  b
//  b 1
//  a: 1
//  a: 2
//  b
// ]
// 
// второй (2) промис теперь имеет статус <fulfilled>
// следовательно игнорируем catch (2.3)
// и добавляем then (2.4) в MIQ
// MIQ [ (1.3), (2.4) ]

// исполняем (1.3)
Promise.resolve() // Первый (1) промис
  // ...
  .then(() => { // (1.3)
    setTimeout(() => console.log("timeout 3"));
    console.log("a: 3");
  });

// setTimeout(() => console.log("timeout 3")) будет добавлен в MAQ
//
// MAQ [
//  setTimeout(() => console.log("timeout 2"))
//  setTimeout(() => console.log("timeout 3"))
// ]
//
// и в консоль выведется "a: 3"
//
// console [
//  b
//  b 1
//  a: 1
//  a: 2
//  b
//  a: 3
// ]
//
// на этом исполнение первого (1) промиса закончено
// MIQ [ (2.4) ]

// исполняем (2.4)
new Promise((res, rej) => { // Второй (2) промис
  // ...
})
  // ...
  .then(() => console.log("b 4")); // (2.4)

// консоль выведется "b 4"
//
// console [
//  b
//  b 1
//  a: 1
//  a: 2
//  b
//  a: 3
//  b 4
// ]

// на этом MIQ пуста, переходим к MAQ
//
// MAQ [
//  setTimeout(() => console.log("timeout 2"))
//  setTimeout(() => console.log("timeout 3"))
// ]
//
// таймауты не имеют аргумента времени и будут исполнены в порядке очереди
//
// console [
//  b
//  b 1
//  a: 1
//  a: 2
//  b
//  a: 3
//  b 4
//  timeout 2
//  timeout 3
// ]

// на этом выполнение программы закончится