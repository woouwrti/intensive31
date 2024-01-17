// задание 5

console.log("1"); // 1

setTimeout(function () {
  console.log("2"); // 4
}, 0);

Promise.resolve().then(() => console.log("3")); // 3: then будет добавлен в MIQ

console.log("4"); // 2

// 1, 4, 3, 2