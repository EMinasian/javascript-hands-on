function addByX(x) {
  return function add(input) {
    return x + input
  }
}

const addByTwo = addByX(2);
console.log(addByTwo(1)); // => should return 3

//------------------------

function once(func) {
  let result
  return function onceFunc(arg) {
    if (!result) {
      result = func(arg)
    }
    return result
  }
}

const onceFunc = once(addByTwo);
console.log(onceFunc(4));  // => should log 6
console.log(onceFunc(10));  // => should log 6

//------------------------------------

function after(count, func) {
  let counter = 1
  return function callAfter() {
    if (counter >= count) {
      func()
    } else {
      counter++
    }
  }
}

const called = function() { console.log('hello') };
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

//--------------------------------

function rollCall(names) {
  let index = 0
  return function getName() {
    if (index < names.length) {
      console.log(names[index])
      index++
    } else {
      console.log('Everyone accounted for')
    }
    
  } 
}

const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth'])
rollCaller() // => should log 'Victoria'
rollCaller() // => should log 'Juan'
rollCaller() // => should log 'Ruth'
rollCaller() // => should log 'Everyone accounted for'

//-------------------------------------------------

function saveOutput(func, magicWord) {
  let PASSWORD
  let outcomes = {}
  return function newFunc(arg) {
    if (magicWord || !PASSWORD) {
      PASSWORD = magicWord
    }
    if (PASSWORD === arg) {
      return outcomes
    }
    const outcome = func(arg)
    outcomes = {...outcomes, [arg]: outcome}
    return outcome
  } 
}

const multiplyBy2 = function(num) { return num * 2; };
const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog('boo')); // => should log { 2: 4, 9: 18 }

//------------------------------------------------------------------------

function cycleIterator(array) {
  let index = 0
  return function dayIterator() {
    const day = array[index % array.length]
    index++
    return day
  } 
}

// /*** Uncomment these to check your work! ***/
const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

//------------------------------------------------------

function defineFirstArg(func, arg) {
  return function newFunction(newArgs) {
    return func(arg, newArgs)
  }
}

const subtract = function(big, small) { return big - small; };
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

//---------------------------------------------------------

function dateStamp(func) {
  return function newFunc(arg) {
    return {
      date: new Date(),
      output: func(arg)
    }
  }
}

const stampedMultBy2 = dateStamp(n => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

//---------------------------------------------------------------


function censor() {
  const map = new Map()
  return function changeScene(...args) {
    const [arg1, arg2] = args
    if (arg2) {
      map.set(arg1, arg2)
    } else {
      let text
      for (const [key, value] of map) {
        text = arg1.replace(key, value)
      }
      return text
    }
  }
}

const changeScene = censor();
changeScene('dogs', 'cats');
changeScene('quick', 'slow');
console.log(changeScene('The quick, brown fox jumps over the lazy dogs.')); // => should log 'The slow, brown fox jumps over the lazy cats.'

//-----------------------------------------------------------------

function createSecretHolder(secret) {
  let value = secret
  return ({
    getSecret: function() {
      return value
    },
    setSecret: function(newValue) {
      value = newValue
    }
  })
}

obj = createSecretHolder(5)
console.log(obj.getSecret()) // => returns 5
obj.setSecret(2)
console.log(obj.getSecret()) // => returns 2

//-----------------------------------------------------------------

function callTimes() {
  let callTime = 0
  return function() {
    return ++callTime
  }
}

let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
console.log(myNewFunc1()); // => 1
console.log(myNewFunc1()); // => 2
console.log(myNewFunc2()); // => 1
console.log(myNewFunc2()); // => 2

//------------------------------------------------------------------------

function roulette(num) {
  let calledNum = 0
  const limit = num
  return function() {
    calledNum++
    if (calledNum < limit) {
      return 'spin'
    } else if (calledNum === limit) {
      return 'win'
    } else {
      return 'pick a number to play again'
    }
  }
}

const play = roulette(3);
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'win'
console.log(play()); // => should log 'pick a number to play again'
console.log(play()); // => should log 'pick a number to play again'

//-----------------------------------------------------------------

function average() {
  let ave = 0
  let n = 0
  return function(num) {
    ave = !num ? ave : (ave * n + num) / (++n)
    return ave
  }
}

const avgSoFar = average();
console.log(avgSoFar()); // => should log 0
console.log(avgSoFar(4)); // => should log 4
console.log(avgSoFar(8)); // => should log 6
console.log(avgSoFar()); // => should log 6
console.log(avgSoFar(12)); // => should log 8
console.log(avgSoFar()); // => should log 8

//-------------------------------------------------------------

function makeFuncTester(arrOfTests) {
  return function(callback) {
    for (const arr of arrOfTests) {
      if (callback(arr[0]) !== arr[1]) {
        return false
      }
    }
    return true
  }
}

const capLastTestCases = [];
capLastTestCases.push(['hello', 'hellO']);
capLastTestCases.push(['goodbye', 'goodbyE']);
capLastTestCases.push(['howdy', 'howdY']);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = str => str.toUpperCase();
const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

//--------------------------------------------------------------------------------------

function makeHistory(limit) {
  const history = []
  return function(inputString) {
    if (inputString === 'undo') {
      return history.length === 0 ? 'nothing to undo' : `${history.pop()} undone`
    }
    history.push(inputString)
    return `${inputString} done`
  }
}

const myActions = makeHistory(2);
console.log(myActions('jump')); // => should log 'jump done'
console.log(myActions('undo')); // => should log 'jump undone'
console.log(myActions('walk')); // => should log 'walk done'
console.log(myActions('code')); // => should log 'code done'
console.log(myActions('pose')); // => should log 'pose done'
console.log(myActions('undo')); // => should log 'pose undone'
console.log(myActions('undo')); // => should log 'code undone'
console.log(myActions('undo')); // => should log 'walk undone'

//----------------------------------------------------------------------------------------

function blackjack(array) {
  let i = 0
  return function dealer(num1, num2) {
    let invokedNum = 0
    let sum = 0
    return function() {
      if (sum === 'bust') {
        return 'you are done!'
      } else if (++invokedNum === 1) {
        sum = num1 + num2
      } else {
        sum = sum + array[i++]
        if (sum >= 21) {
          sum = 'bust'
        }
      }
      return sum
    }
  }

}

/*** DEALER ***/
const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);

/*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

/*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

/*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!