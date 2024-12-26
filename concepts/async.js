function delayedGreet () {
  setTimeout(() => {console.log('Hello')}, 3 * 1000)
}

// delayedGreet ()
//-------------------------------------------------------

function helloGoodbye() {
  setTimeout(() => {console.log('Goodbye')}, 2 * 1000)
  console.log('Hello')
}

// helloGoodbye()
//---------------------------------------------------------

function brokenRecord() {
  setInterval(() => {console.log('Hi again!')}, 2 * 1000)
}

// brokenRecord()
//---------------------------------------------------------

function limitedRepeat() {
  const id = setInterval(() => {console.log('Hi again!')}, 1 * 1000)
  setTimeout(() => {clearInterval(id)}, 5 * 1000)
}

// limitedRepeat()
// --------------------------------------------

function everyXsecsForYsecs(func, interval, duration) {
  const id = setInterval(() => { func() }, interval * 1000);
  setTimeout(() => { clearInterval(id) }, duration * 1000)
}

function theEnd() {
  console.log('This is the end!');
}
// everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!
// -----------------------------------------------------------------------

function promised (val) {
  return new Promise((resolve) => {setTimeout(() => {resolve(val)}, 2 * 1000)})
}

const createPromise = promised('wait for it...');
createPromise.then((val) => console.log(val)); 
// will log "wait for it..." to the console after 2 seconds
//----------------------------------------------------------------------

class SecondClock {
  constructor(cb) {
    this.callback = cb
    this.secondsValue = 1
    this.intervalId = null
    this.timeoutIds = []
  }
  start() {
    this.intervalId = setInterval(() => {
      const id = setTimeout(() => { this.callback(this.secondsValue) }, this.secondsValue++ * 1000)
      this.timeoutIds.push(id)
    }, 1 * 1000)
  }
  reset() {
    clearInterval(this.intervalId)
    this.timeoutIds.forEach(id => clearTimeout(id))
    this.secondsValue = 1
  }
}

// const clock = new SecondClock((val) => { console.log(val) });
// console.log("Started Clock.");
// clock.start();
// setTimeout(() => {
//     clock.reset();
//     console.log("Stopped Clock after 6 seconds.");
// }, 6000);
// --------------------------------------------------------------------------------------

function debounce(callback, interval) {

  let timePassed = false
  setTimeout(() => { timePassed = true }, interval)

  return function() {
    if (timePassed) {
      return callback()
    } else {
      return undefined
    }

  }
}

function giveHi() { return 'hi'; }
const giveHiSometimes = debounce(giveHi, 3000);
console.log(giveHiSometimes()); // -> 'undefined'
setTimeout(function() { console.log(giveHiSometimes()); }, 2000); // -> undefined
setTimeout(function() { console.log(giveHiSometimes()); }, 4000); // -> hi
setTimeout(function() { console.log(giveHiSometimes()); }, 8000); // -> 'hi'