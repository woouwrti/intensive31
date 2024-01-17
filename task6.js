// задание 6

// Напишите функцию, которая будет проходить через массив целых чисел 
// и выводить индекс каждого элемента с задержкой в 3 секунды.
// Входные данные: [10, 12, 15, 21]

const arr = [10, 12, 15, 21];

function showArrTimeout(arr) {
  const startTime = Date.now();

  for (let index in arr) {
    setTimeout(() => console.log(index, "Timeout", Date.now() - startTime), 3000 * (+index + 1));
  }
}

function showArrInterval(arr) {
  const startTime = Date.now();
  let index = 0;

  const interval = setInterval(() => {
    console.log(index, "Interval", Date.now() - startTime);

    if (index == arr.length - 1) clearInterval(interval);

    index++;
  }, 3000);
}

showArrTimeout(arr)
showArrInterval(arr)