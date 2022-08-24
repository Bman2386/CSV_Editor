const data =  require('./ignore/Remove_8-9_8-22.json')
const fs = require("fs");
const subCleanedData = []

for (obj in data){
    if (data[obj].first_name && data[obj].last_name){
        subCleanedData.push(data[obj])
    }
}

let json = JSON.stringify(subCleanedData);
fs.writeFileSync('./ignore/subCleaned.json', json)
console.log('File Generated: subCleaned.json')

