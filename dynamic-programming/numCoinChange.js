function constructMethods(methodString, coin) {
  const methodsArray = methodString.split("-");
  return new Set(
    methodsArray.map((method) =>
      [...method.split(",").map((item) => Number(item)), coin]
        .sort((a, b) => a - b)
        .join(",")
    )
  );
}

/*
 */
function numCoinChange(n, coins) {
  const methodsNum = new Array(n + 1).fill(0);
  const methods = [""];

  for (let i = 1; i <= n; i++) {
    let num = methodsNum[i];
    let method = "";
    const set = new Set();
    for (const coin of coins) {
      if (i === coin) {
        num = num + 1;
        method = `${coin}`;
      } else if (i > coin) {
        const remainder = i - coin;
        if (methodsNum[remainder] !== 0) {
          const newMethods = constructMethods(methods[remainder], coin);
          newMethods.forEach((newMethod) => {
            set.add(newMethod);
          });
        }
      }
    }
    set.forEach((element) => {
      num = num + 1;
      method = `${method}${method !== "" ? "-" : ""}${element}`;
    });

    methodsNum[i] = num;
    methods[i] = method;
  }
  return methodsNum[n];
}

console.log(numCoinChange(12, [3, 4, 8]));
