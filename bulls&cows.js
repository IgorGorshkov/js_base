"use strict";
startGame();

// компьютер должен загадать число из 4-х неповторояющихся цифр
// в answer после prompt мы получаем строку, которую можем разделить с помощью
// метода split
// далее результат нужно сравнить с помощью функции getBullsAndCowsCount()
function startGame() {
  let riddle = getRandomNumberAsArray();
  while (true) {
    let answer = prompt("Угадайте 4-х значное число").split("");
    let result = getBullsAndCowsCount(riddle, answer);
    console.log(
      `Ваш ответ ${answer}, быков: ${result.bullsCount}, коров: ${result.cowsCount}`
    );
    if (riddle.toString() === answer.toString()) {
      console.log("Вы победили");
      break;
    }
  }
  console.log("Загадка" + riddle);
}

// должны превратить полученные числа в строку, чтобы использовать
// метод includes() для проверки
function getRandomNumberAsArray() {
  let generated = String(Math.random() * 10_000_000_000_000_000);
  let result = [];
  for (let value of generated) {
    if (!result.includes(value)) {
      result.push(value);
    }
    if (result.length === 4) {
      return result;
    }
  }
}

function getBullsAndCowsCount(riddle, answer) {
  let bullsCount = getBullsCount(riddle, answer);
  let cowsCount = getCowsCount(riddle, answer);
  return {
    bullsCount: bullsCount,
    cowsCount: cowsCount - bullsCount, // из коров вычитаем тех, кто оказался быками
  };
}

function getBullsCount(riddle, answer) {
  let count = 0;
  for (let i = 0; i < riddle.length; i++) {
    if (riddel[i] === answer[i]) {
      count++;
    }
  }
  return count;
}

function getCowsCount(riddle, answer) {
  let count = 0;
  for (let value of riddle) {
    if (answer.includes(value)) {
      count++;
    }
  }
  return count;
}
