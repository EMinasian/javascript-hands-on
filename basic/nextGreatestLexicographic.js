/*
* A function that receives a word and returns
* the next greater lexicographic word with the same letters.
*/

function nextGreatestLexicographic(w) {
    const arr = w.split('')
    let threshold
    for (let i = arr.length - 2; i >= 0; i--) {
        for (let j = arr.length - 1; j > i; j--) {
            if (arr[j] > arr[i]) {
                const temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
                threshold = i
                break
            }
        }
        if(threshold !== undefined) {
            break
        }
    }
    
    if (threshold === undefined) {
        return 'no answer'
    }

    const leftArray = arr.splice(0, threshold + 1)
    return leftArray.join('') + arr.sort().join('')
}

console.log(biggerIsGreater('ab'))