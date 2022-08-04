console.log('cleaning data')
// require files here!
const oldData = require('./Albemarle 2.json')
const newData = require('./Albemarle 1-1_7-25.json')
//Don't change this import though!
const fs = require("fs");

const newJSONFile = [];

//removes entries of oldData from newData
for (data in newData){
     let pass = true
    for (old in oldData){
        if (newData[data]["Contact Id"].includes(oldData[old]["Contact Id"])){
            pass = false
            break
        }
    }
    if (pass) newJSONFile.push(newData[data])
}
// export clean JSON data
let json = JSON.stringify(newJSONFile);
fs.writeFileSync('cleanData.json', json)
console.log('File Generated: cleanData.json')