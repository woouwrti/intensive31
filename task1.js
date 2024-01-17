// задание 1

console.log('1'); // 1: попадет в call stack и будет сразу же исполнено

setTimeout(() => console.log('2'), 1); // 6 / 5 т.к. попадает в MAQ (Macrotask queue) и выполняется одним их последних

let promiseNew = new Promise((resolve) => {
  console.log('3'); // 2: попадет в call stack во время объявления объекта Promise
  resolve();
});

promiseNew.then(() => console.log('4')); // 4: попадает в MIQ (Microtask queue)

setTimeout(() => console.log('5')); // 5 / 6 т.к. попадает в очередь MAQ.
// Default delay in [browser, nodeJS] = [0, 1] https://nodejs.org/api/timers.html#settimeoutcallback-delay-args

console.log('6'); // 3: последним попадает в call stack

// 1, 3, 6, 4, 2, 5 ( in node.js )
// 1, 3, 6, 4, 5, 2 ( in browser )