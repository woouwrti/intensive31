// БОНУС:

// 1) Написать функцию, которая вернет массив с первой парой чисел, сумма которых равна total:

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
total = 13;
result = [4, 9]

arr2 = [2, 4, 6, 8, 11, 14, 17, 20]
total2 = 20
result2 = [6, 14];

arr3 = [2, 4, 6, 8, 11, 13, 17, 20]
total3 = 20
result3 = false;

const firstSum = (arr, total) => {
  let leftI = 0;
  let rightI = arr.length - 1;

  while (leftI < rightI) {
    if (arr[leftI] + arr[rightI] === total) return [arr[leftI], arr[rightI]]
    else if (arr[leftI] + arr[rightI] < total) leftI++
    else if (arr[leftI] + arr[rightI] > total) rightI--
  }

  return false
}

const secondSum = (arr, total) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === total) return [arr[i], arr[j]];
    }
  }
  return false;
};

console.log(firstSum(arr, total));
console.log(firstSum(arr2, total2));
console.log(firstSum(arr3, total3));

console.log(secondSum(arr, total));
console.log(secondSum(arr2, total2));
console.log(secondSum(arr3, total3));

// 2) Какая сложность у вашего алгоритма ?

// firstSum имеет сложность O(n), но мне он кажется неустойчивым

// secondSum имеет сложность O(n^2)