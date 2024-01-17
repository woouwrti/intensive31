// задание 2

let promiseTree = new Promise((resolve, reject) => {
  resolve("a"); // промис станет fulfilled со значением "a"
  console.log("1"); // 1: попадет в call stack
  setTimeout(() => {
    console.log("2"); // 3: попадет в MAQ и выполнится после всех
  }, 0);
  console.log("3"); // 2: последним попадет в call stack
});

// 1, 3, 2