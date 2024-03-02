/*
* A function that receives an array of numbers
* and prints the sum of the 4 smallest numbers
* and the sum of the 4 greatest number
*/
function miniMaxSum(arr) {
    let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY, sum = 0
    arr.forEach(i => {
        if (i < min) min = i
        if (i > max) max = i
        sum = sum + i
    })
    console.log(sum - max, sum - min)
}

miniMaxSum([769082435, 210437958, 673982045, 375809214, 380564127])