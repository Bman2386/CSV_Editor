console.log('cleaning data')
// require files here!
const oldData = require('./ignore/van_id.json')
const newData = require('./ignore/data.json')
//Don't change this import though!
const fs = require("fs");

const newJSONFile = [];
let rejects = []

//removes entries of oldData from newData
for (data in newData){
     let pass = false
     let new_data = {}
     if (newData[data]['Primary City'].length === 0 || newData[data]['Last Name'].length === 0) {
        rejects.push(newData[data])
        console.log(rejects)
        return
     } else {
        let first = newData[data]['First Name']
        let last = ''
        let city = ''
        try {
         last = Array.isArray(newData[data]['Last Name']) ? newData[data]['Last Name'][0].toUpperCase() : newData[data]['Last Name'].toUpperCase()
         city = newData[data]["Primary City"]   
        } catch(error){
            console.log(newData[data])
            console.log(error)
            return
        }
       
        
    for (old in oldData){
        // if (newData[data]["Contact Id"].includes(oldData[old]["Contact Id"])){
            let vanFirst = oldData[old]["first_name"]
            let vanLast = oldData[old]["last_name"]
            let address = oldData[old]['voting_city']
            // let address = oldData[old]['voting_street_address']
           if (!!vanLast && !!vanFirst && (address === city && vanLast.includes(last) && vanFirst.includes(first[0]))){ 
            new_data["vbvotebuilder_id"] = oldData[old]['myv_van_id']
            new_data['name'] = `${vanFirst} ${vanLast}`
            new_data['data_address'] = oldData[old]['voting_street_address']
            pass = true
            break
            } 
        }
     }
    
    // if (pass) newJSONFile.push(newData[data])
    if (pass) newJSONFile.push(new_data)
    if (!pass) rejects.push(newData[data])
}
// export clean JSON data
let json = JSON.stringify(newJSONFile);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')
console.log(rejects)
console.log(rejects.length)