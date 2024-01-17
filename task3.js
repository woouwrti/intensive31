// задание 3

let promiseTwo = new Promise((resolve, reject) => {
  resolve("a"); // вернет "a" и промис в состоянии fulfilled
});
promiseTwo
  .then((res) => {
    return res + "b"; // "a" + "b" === "ab"
  })
  .then((res) => {
    return res + "с"; // "ab" + "c" === "abc"
  })
  .finally((res) => { // метод не получает аргументов
    return res + "!!!!!!!"; // и строка не будет изменена
  })
  .catch((res) => { // в ходе выполнения нет ошибки, метод будет пропущен
    return res + "d"; // и наша строка не будет изменена
  })
  .then((res) => {
    console.log(res); // "abc"
  });

// "abc"
