/*
 * n: the total sum of money
 * coins: an array of coins (values) available to make the sum
 * returns the minimum possible number of required coins
 */
function minCoinChange(n, coins) {
  const coinNum = [0]; //the min number of coins to get the value = index
  for (let i = 1; i <= n; i++) {
    let min = Number.POSITIVE_INFINITY;

    for (const coin of coins) {
      if (i >= coin) {
        const remainder = i - coin;
        // -1 to denote impossible scenario
        if (coinNum[remainder] !== -1) {
          min = Math.min(min, coinNum[remainder] + 1);
        }
      }
    }
    coinNum[i] = min === Number.POSITIVE_INFINITY ? -1 : min;
  }
  return coinNum[n];
}
