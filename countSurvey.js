console.log('counting data')
// require files here!
const dataToCount = require('./ignore/data.json')
//Don't change this import though!
const fs = require("fs")

const newJSONFile = []
const countSurveyResponses=(table)=> {
    let one = 0
    let two = 0
    let three = 0
    let four = 0
    let five = 0
    for (data in table){
     if (table[data]["Survey Response"][0] === '1') one++
     if (table[data]["Survey Response"][0] === '2') two++
     if (table[data]["Survey Response"][0] === '3') three++
     if (table[data]["Survey Response"][0] === '4') four++
     if (table[data]["Survey Response"][0] === '5') five++
    }
    const supportDem = {type: 'Support Democrat', total: one}
    const likelyDem = {type: 'Likely Democrat', total: two}
    const undecided = {type: 'Undecided', total: three}
    const likelyRep = {type: 'Likely Republican', total: four}
    const strongRep = {type: 'Strong Republican', total: five}
    newJSONFile.push(supportDem)
    newJSONFile.push(likelyDem)
    newJSONFile.push(undecided)
    newJSONFile.push(likelyRep)
    newJSONFile.push(strongRep)
}
countSurveyResponses(dataToCount)
const json = JSON.stringify(newJSONFile)
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')