console.log('counting data')
// require files here!
const dataToClean = require('./ignore/data.json')
//Don't change this import though!
const fs = require("fs")
const newJSONFile = []


for (data in dataToClean){
    if (dataToClean[data]["First Name"].length > 0 && dataToClean[data]["Last Name"].length > 0){
        newJSONFile.push(dataToClean[data])
    }
}

const json = JSON.stringify(newJSONFile)
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')