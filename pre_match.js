console.log('MATCHING PRECINCTS')

const data = require('./ignore/data.json')
const currPrecincts = require('./ignore/van_precincts.json')
const fs = require("fs")

const newJSONFile = []

for (p in data){
    let pass = false
    for (c in currPrecincts){
       
        if (currPrecincts[c].precinct == data[p].precinct_name){
            pass = true
            break
        }
    }
    if (pass) newJSONFile.push(data[p])
}

let json = JSON.stringify(newJSONFile);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')