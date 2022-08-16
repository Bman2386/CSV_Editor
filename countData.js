console.log('counting data')
// require files here!
const dataToCount = require('./2.json')
//Don't change this import though!
// const fs = require("fs");

let one = 0
let two = 0
let three = 0
let four = 0
let five = 0

let canvass = 0
let refused = 0
let hostile = 0
let leftMessage = 0
let litDropped = 0
let disconnected = 0
let notHome = 0
let texted = 0
let inaccessible = 0
let moved = 0
let wrongNum = 0
//removes entries of oldData from newData
// for (data in dataToCount){
//      if (dataToCount[data]["Survey Question Name"][0] === '1') one++
//      if (dataToCount[data]["Survey Question Name"][0] === '2') two++
//      if (dataToCount[data]["Survey Question Name"][0] === '3') three++
//      if (dataToCount[data]["Survey Question Name"][0] === '4') four++
//      if (dataToCount[data]["Survey Question Name"][0] === '5') five++
//     }
// console.log(dataToCount.length)
// console.log(`1:${one}, 2: ${two}, 3: ${three}, 4: ${four}, 5: ${five} `)

for (data in dataToCount){
    // console.log(dataToCount[data])
    if (dataToCount[data]["Contact Type"] === "Canvassed") canvass++
    if (dataToCount[data]["Contact Type"] === "Refused") refused++
    if (dataToCount[data]["Contact Type"] === "Hostil") hostile++
    if (dataToCount[data]["Contact Type"] === "Left Message") leftMessage++
    if (dataToCount[data]["Contact Type"] === "Lit Dropped") litDropped++
    if (dataToCount[data]["Contact Type"] === "Disconnected") disconnected++
    if (dataToCount[data]["Contact Type"] === "Not Home") notHome++
    if (dataToCount[data]["Contact Type"] === "Texted") texted++
    if (dataToCount[data]["Contact Type"] === "Inaccessible") inaccessible++
    if (dataToCount[data]["Contact Type"] === "Moved") moved++
    if (dataToCount[data]["Contact Type"] === "Wrong Number") wrongNum++
}

console.log(`Canvassed ${canvass}, Refused ${refused}, Hostil ${hostile},
Left Message ${leftMessage}, Lit Dropped ${litDropped}, 
Disconnected ${disconnected}, Not Home ${notHome}
Texted ${texted}, Inaccessible ${inaccessible}, Moved ${moved}, 
Wrong Number ${wrongNum}`)