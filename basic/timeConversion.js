/* 
* A function to convert 12 (AM/PM) time to 24hr format.
*/

function timeConversion(s) {
    const amTime = /AM/.test(s)
    const [hours, minutes, seconds] = s.replace(amTime ? 'AM' : 'PM', '').split(':')

    const hoursMap = {
        [hours]: amTime ? hours : (Number(hours) + 12),
        12: amTime ? '00' : '12'
    }

    return `${hoursMap[hours]}:${minutes}:${seconds}`
}

console.log(timeConversion('08:15:35PM'))