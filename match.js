const data = require('./ignore/data.json')
const match = require('./ignore/van_id.json')
const fs = require("fs");
const matchedData = []
let rejects = 0
for (obj in data){
    let pass = false
    let new_data = {}
    let nameArray = data[obj]['Contact Name'].split(' ')
    let address = data[obj]['Primary Address 1']
    let city = data[obj]['Primary City']
    for (id in match){
        let mCity = match[id].voting_city
        let mAddress =  match[id].voting_street_address
        let fName = match[id].first_name
        let lName = match[id].last_name
        if ((address === mAddress || city === mCity) && (lName.includes(nameArray[1].toUpperCase()) || fName.includes(nameArray[0].toUpperCase()))){
            new_data["vbvotebuilder_id"] = match[id].myv_van_id
            new_data['name'] = nameArray.join()
            new_data['data_address'] = address
            pass = true
            break
        }
    }
    if (pass) matchedData.push(new_data)
    if (!pass) rejects++
}

let json = JSON.stringify(matchedData);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')
console.log(rejects)
