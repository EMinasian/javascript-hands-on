function balancedBrackets(s) {
    const stack = []
    for (let i = 0; i < s.length; i++) {
        const char = s[i]
        if (/^[({\[]$/.test(char)) {
            stack.push(char)
        } else if (char === ')' && stack[stack.length - 1] === '(') {
            stack.pop()
        } else if (char === '}' && stack[stack.length - 1] === '{') {
            stack.pop()
        } else if (char === ']' && stack[stack.length - 1] === '[') {
            stack.pop()
        } else {
            return 'NO'
        }
    }
    return stack.length === 0 ? 'YES' : 'NO'
}