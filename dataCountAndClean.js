console.log('cleaning data')
// require files here!
const oldData = require('./ignore/van_id.json')
const newData = require('./ignore/2022-07-25.json')
//Don't change this import though!
const fs = require("fs");

const newJSONFile = [];
let rejects = {}
//removes entries of oldData from newData
for (data in newData){
     let pass = false
    let data_name = newData[data]['Contact Name'].split(' ')
    let first = data_name[0].toUpperCase()
    let last = data_name[1].toUpperCase()
    let data_address = newData[data]['Primary Address 1']
    let new_data = {}
    for (old in oldData){
        // if (newData[data]["Contact Id"].includes(oldData[old]["Contact Id"])){
            let vanFirst = oldData[old]["first_name"]
            let vanLast = oldData[old]["last_name"]
            // let address = oldData[old]['voting_street_address']
           if (vanLast.includes(last) && vanFirst.includes(first)){ 
            new_data["vbvotebuilder_id"] = oldData[old]['myv_van_id']
            new_data['name'] = `${vanFirst} ${vanLast}`
            new_data['data_address'] = data_address
            pass = true
            break
        } 
    }
    // if (pass) newJSONFile.push(newData[data])
    if (pass) newJSONFile.push(new_data)
    if (!pass) rejects[data] = newData[data]
}
// export clean JSON data
let json = JSON.stringify(newJSONFile);
fs.writeFileSync('cleanData.json', json)
console.log('File Generated: cleanData.json')
console.log(rejects)