console.log('cleaning data')
// require files here!
const countTypes = (precinct)=> {
    if (precinct.result_short_name === 'Canvassed') return 'Canvassed'
    if (precinct.result_short_name === 'Refused') return 'Refused'
    if (precinct.result_short_name === 'Hostil') return 'Hostil'
    if (precinct.result_short_name === 'Left Message') return 'Left_Message'
    if (precinct.result_short_name === 'Lit Dropped') return 'Lit_Dropped'
    if (precinct.result_short_name === 'Disconnected') return 'Disconnected'
    if (precinct.result_short_name === 'Not Home') return 'Not_Home'
    if (precinct.result_short_name === 'Texted') return 'Texted'
    if (precinct.result_short_name === 'Inaccessible') return 'Inaccessible'
    if (precinct.result_short_name === 'Moved') return 'Moved'
    if (precinct.result_short_name === 'Wrong Number') return 'Wrong_Num'
    if (precinct.contact_type === 'Phone') return 'Left Message'
    if (precinct.contact_type === 'SMS Text') return 'Texted'
}
   
const oldData = require('./ignore/test2.json')
if (oldData === undefined) {
    console.log("Can't find Data!")
    return
}
//Don't change this import though!
const fs = require("fs");

const newJSONFile = [];
const newData = {}
//organize data here
for (data in oldData){
    let curr = oldData[data]
    let precinct = curr.precinct_code
    let type = countTypes(curr)
    if (newData[precinct]){
        newData[precinct][type] ? newData[precinct][type]++ : newData[precinct][type] = 1
        } else {
            newData[precinct] = {
                county: curr.county,
                precinct: precinct,
                Canvassed: 0,
                Refused: 0,
                Hostile: 0,
                Left_Message: 0,
                Lit_Dropped: 0,
                Disconnected: 0,
                Not_Home: 0,
                Texted: 0,
                Inaccessible: 0,
                Moved: 0,
                Wrong_Num: 0
            }
            newData[precinct][type] = 1
        }
    }
for (data in newData){
    newJSONFile.push(newData[data])
}


// export clean JSON data
let json = JSON.stringify(newJSONFile);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')
