const data = require('./ignore/data.json')
const match = require('./ignore/van_id.json')
const fs = require("fs");
const matchedData = []
let rejects = 0
let total = 0

if (data[0]['Mail Name'].length > 0) {
    for (obj in data){
    let pass = false
    let new_data = {}
    let nameArray = data[obj]['Mail Name'].split(' ')
    let address = data[obj]['Primary Address 1']
    let city = data[obj]['Primary City']
    if (nameArray.length > 1 && address.length > 0){
      for (id in match){
        let mCity = match[id].voting_city
        let mAddress =  match[id].voting_street_address
        let name = match[id].last_name + match[id].first_name
       
        if ((address === mAddress || city === mCity) && (name.includes(nameArray[1].toUpperCase())) || name.includes(nameArray[0].toUpperCase())){
            new_data["vbvotebuilder_id"] = match[id].myv_van_id
            new_data['first_name'] = nameArray[0]
            new_data['last_name'] = nameArray[1]
            new_data['data_address'] = address
            pass = true
            break
        }  
    }
    
    if (pass) matchedData.push(new_data)
    if (!pass) rejects++
    total++
    }}} else {
        for (obj in data){
            let pass = false
            let new_data = {}
            let nameArray = data[obj]['Mail Name'].split(' ')
            let address = data[obj]['Primary Address 1']
            let city = data[obj]['Primary City']
            if (nameArray.length > 1 && address.length > 0){
              for (id in match){
                let mCity = match[id].voting_city
                let mAddress =  match[id].voting_street_address
                let name = match[id].last_name + match[id].first_name
               
                if ((address === mAddress || city === mCity) && (name.includes(nameArray[1].toUpperCase())) || name.includes(nameArray[0].toUpperCase())){
                    new_data["vbvotebuilder_id"] = match[id].myv_van_id
                    new_data['first_name'] = nameArray[0]
                    new_data['last_name'] = nameArray[1]
                    new_data['data_address'] = address
                    pass = true
                    break
                }  
            }
            
            if (pass) matchedData.push(new_data)
            if (!pass) rejects++
            total++
            }} 
    }

let json = JSON.stringify(matchedData);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')
let percentRejected = (rejects/total)*100
console.log('-',rejects,'of Total:',total,', Percent Rejected =', percentRejected,'%' )


