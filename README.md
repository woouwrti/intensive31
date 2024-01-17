# intensive31

Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):

1)
    console.log('1');
    setTimeout(() => console.log('2'), 1);
    let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
    });
    promiseNew.then(() => console.log('4'));
    setTimeout(() => console.log('5'));
    console.log('6');

2)
    let promiseTree = new Promise((resolve, reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
    console.log("2");
    }, 0);
    console.log("3");
    });

3)
    let promiseTwo = new Promise((resolve, reject) => {
    resolve("a");
    });
    promiseTwo
    .then((res) => {
    return res + "b";
    })
    .then((res) => {
    return res + "с";
    })
    .finally((res) => {
    return res + "!!!!!!!";
    })
    .catch((res) => {
    return res + "d";
    })
    .then((res) => {
    console.log(res);
    });

4)
    function doSmth() {
    return Promise.resolve("123");
    }
    doSmth()
    .then(function (a) {
    console.log("1", a); //
    return a;
    })
    .then(function (b) {
    console.log("2", b);

    return Promise.reject("321");
    })
    .catch(function (err) {
    console.log("3", err);
    })
    .then(function (c) {
    console.log("4", c);
    return c;
    });

5)
    console.log("1");
    setTimeout(function () {
    console.log("2");
    }, 0);
    Promise.resolve().then(() => console.log("3"));
    console.log("4");

6) Напишите функцию, которая будет проходить через массив целых чисел и выводить индекс каждого
    элемента с задержкой в 3 секунды.
    Входные данные: [10, 12, 15, 21]

7) Прочитать про Top Level Await (можно ли использовать await вне функции async)

Задание "со звёздочкой": (asteriskTask.js)

    1) Сначала без запуска подцумайте какой будет порядок вывода в консоль
    2) Скопируйте и запустите код в любой консоли
    3) А дальше прикрипите к дз подробное обьяснение по шагам о работе эвент лупа в этом коде и собственно объяснение почему выведеться именно в таком порядке

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
