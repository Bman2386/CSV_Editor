console.log('finding matches')
const rawData = require('./ignore/data.json')
const fs = require("fs");
const newJSONFile = []
// set search criterea
const matchMe = 'STUDENT'
// finds matches in data
for (data in rawData){
    let job = rawData[data]["Occupation"]
    // console.log(rawData[data])
    if (typeof job === 'object') job = rawData[data]["Occupation"][0]
    if (job != '' && job.toUpperCase().includes(matchMe)){
        newJSONFile.push(rawData[data])
    }
}

//find poll observer
// for (data in rawData){
//     let type = rawData[data]["Event Name"]
//     if (type.includes('Poll')) newJSONFile.push(rawData[data])
// }
// export clean JSON data
let json = JSON.stringify(newJSONFile);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')
console.log(`${newJSONFile.length} matches found!`)