/*
* Modified fibonacci (power of 2)
* points: how to avoid overflow for huge numebrs, and recrsive
*/
function fibonacciModified(t1, t2, n) {
    // Write your code here
    if (n === 1) {
        return String(t1)
    }
    const T1 = BigInt(t1)
    const T2 = BigInt(t2)
    return fibonacciModified(T2, T1 + T2 * T2, n - 1)

}

console.log(fibonacciModified(0, 1, 10))