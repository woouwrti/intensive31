// задание 4

function doSmth() {
  return Promise.resolve("123"); // fulfilled promise со значением "123"
}
doSmth()
  .then(function (a) {
    console.log("1", a); // 1, 123
    return a; // 123
  })
  .then(function (b) {
    console.log("2", b); // 2, 123

    return Promise.reject("321"); // rejected promise со значением "321"
  })
  .catch(function (err) { // обрабатывает rejected promise
    console.log("3", err); // 3, 321
  })
  .then(function (c) { // получен pending fulfilled без значения
    console.log("4", c); // 4, undefined
    return c; // undefined
  });

// 1 123, 2 123, 3 321, 4 undefined