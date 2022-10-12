console.log('Matching Precincts')

const currData = require('./ignore/data2.json')
const allPrec = require('./ignore/cleanData.json')

const fs = require("fs");
const newJSONFile = []

// Add empty precincts for those missing
for (data in allPrec){
    let currPrec = allPrec[data].precinct
    let add = false
    for (obj in currData){
        let pre = currData[obj].precinct_name
        if (currPrec === pre){
            add = {
                "county_name": currData[obj].county_name,
                "precinct_name": currData[obj].precinct_name,
                "Support_Democrat": currData[obj].Support_Democrat,
                "Lean_Democrat": currData[obj].Lean_Democrat,
                "Undecided": currData[obj].Undecided,
                "Lean_GOP": currData[obj].Lean_GOP,
                "Support_GOP": currData[obj].Support_GOP
            }
            break
        }
    }
    if (add) newJSONFile.push(add)
    if (!add) newJSONFile.push({
        "county_name": allPrec[data].county,
                "precinct_name": currPrec,
                "Support_Democrat": 0,
                "Lean_Democrat": 0,
                "Undecided": 0,
                "Lean_GOP": 0,
                "Support_GOP": 0
    })
}

let json = JSON.stringify(newJSONFile);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')