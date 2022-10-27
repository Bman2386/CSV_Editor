const data = require('./ignore/data.json')
const match = {
    'A': require('./ignore/match/A.json'),
    'B': require('./ignore/match/B.json'),
    'C': require('./ignore/match/C.json'),
    'D': require('./ignore/match/D.json'),
    'E': require('./ignore/match/E.json'),
    'F': require('./ignore/match/F.json'),
    'G': require('./ignore/match/G.json'),
    'H': require('./ignore/match/H.json'),
    'I': require('./ignore/match/I.json'),
    'J': require('./ignore/match/J.json'),
    'K': require('./ignore/match/K.json'),
    'L': require('./ignore/match/L.json'),
    'M': require('./ignore/match/M.json'),
    'N': require('./ignore/match/N.json'),
    'O': require('./ignore/match/O.json'),
    'P': require('./ignore/match/P.json'),
    'Q': require('./ignore/match/Q.json'),
    'R': require('./ignore/match/R.json'),
    'S': require('./ignore/match/S.json'),
    'T': require('./ignore/match/T.json'),
    'U': require('./ignore/match/U.json'),
    'V': require('./ignore/match/V.json'),
    'W': require('./ignore/match/W.json'),
    'X': require('./ignore/match/X.json'),
    'Y': require('./ignore/match/Y.json'),
    'Z': require('./ignore/match/Z.json')
}
const fs = require("fs");
const matchedData = []
let rejects = 0
let total = 0

if (data[0]['Mail Name'] !== undefined) {
    for (obj in data){
    let pass = false
    let new_data = {}
    if (data[obj]['Mail Name'] === '') break
    let nameArray = []
    nameArray.push(data[obj]['First Name'])
    nameArray.push(data[obj]['Last Name'])
    // let nameArray = data[obj]['Mail Name'].split(' ')
    let address = data[obj]['Primary Address 1']
    let city = data[obj]['Primary City']
    let nameMatch = match[nameArray[1][0]]
    if (nameArray.length > 1 && address.length > 0){
      for (id in nameMatch){
        let mCity = nameMatch[id].voting_city
        let mAddress =  nameMatch[id].voting_street_address
        let name = nameMatch[id].last_name + nameMatch[id].first_name
       
        if ((address === mAddress || city === mCity) && (name.includes(nameArray[1].toUpperCase())) || name.includes(nameArray[0].toUpperCase())){
            new_data["van_id"] = nameMatch[id].myv_van_id
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
            let nameArray = data[obj]['Contact Name'].split(' ')
            let address = data[obj]['Primary Address 1']
            let city = data[obj]['Primary City']
            let county = data[obj]['County']
            if (nameArray.length > 1 && address.length > 0){
            let matchName = match[nameArray[1][0]]
              for (id in matchName){
                let mCity = matchName[id].voting_city
                let mAddress =  matchName[id].voting_street_address
                let name = matchName[id].last_name + matchName[id].first_name
                let mCounty = matchName[id].county_name
                if ((county === mCounty) && (address === mAddress || mCity === city) && (name.includes(nameArray[1].toUpperCase())) || name.includes(nameArray[0].toUpperCase())){
                    new_data["van_id"] = matchName[id].myv_van_id
                    new_data['first_name'] = matchName[id].first_name
                    new_data['last_name'] = matchName[id].last_name
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
console.log('-',rejects,' Rejects of Total:',total,', Percent Rejected =', percentRejected,'%' )


