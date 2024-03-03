/*
* n: the total length of the rod
* p: an array of profit wherein the index is the cut length
* return: the maximum benefit obtained from optimally cutting the rod
*/
function rodCutting(n, p) {
    const benefit = [0]
    for(let i = 1; i <= n; i++) {
        let max = Number.NEGATIVE_INFINITY
        for(let j = i; j > 0; j--) {
            const newBenefit = benefit[i - j] + p[j]
            if (newBenefit > max) {
                max = newBenefit
            }
        }
        benefit[i] = max
    }
    return benefit[n]
}

console.log(rodCutting(4, [0, 1, 5, 8, 9]))