/*
* The arrayShuffle function is intended to accept an array of numbers as input
* and to return it randomly shuffled, while the consecutive numbers stay in the
* original order. 
*/

function generateBlockedStringArray(arr) {
  let block = [];
  let stringArr = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    if (block.length === 0) {
      block.push(element);
    } else if (block[block.length - 1] + 1 === element) {
      block.push(element);
    } else {
      stringArr.push(block.join(","));
      block = [element];
    }

    if (i === arr.length - 1 && block.length !== 0) {
      stringArr.push(block.join(","));
    }
  }

  return stringArr;
}

function arrayShuffle(arr) {
  const stringArr = generateBlockedStringArray(arr);
  const shuffledArr = [];

  while (stringArr.length > 0) {
    const index = Math.floor(Math.random() * stringArr.length);
    shuffledArr.push(stringArr.splice(index, 1));
  }

  const result = [];
  shuffledArr.forEach((element) => {
    element[0].split(",").forEach((num) => {
      result.push(Number(num));
    });
  });

  return result;
}

console.log(arrayShuffle([1, 2, 4, 5, 7, 9, 10, 30]));
