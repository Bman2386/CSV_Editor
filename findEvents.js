const data = require('./ignore/data.json');

    const event = {}
    const countedData = []
const today = new Date
    today.setDate(today.getDate() - 1) //comment out for today, leave in for yesterday, decrease by 1/day 
const day = today.getDate()
const month = today.getMonth() + 1
const year = today.getFullYear()

for (id in data){
    let name = data[id]['Event Name']
    let num1 = data[id]["DCCC Volunteer Organizing Turf: DCCC Volunteer Team"]
    let num2 = data[id][["DCCC Volunteer Organizing Turf: DCCC Volunteer Organizer"]]
    if (event[name]){
        let curr = event[name].count + 1
        event[name].count = curr
    }
    if (!event[name] && data[id]['Status'] === 'Completed'){
        event[name] = {
            event_name: name,
            count: 1,
            organizer: `${num2}${num1}`,
            date: data[id]['Event Date'],
            type: data[id]['Event Type']
        }

    }
}

for (e in event){
    if ((event[e].organizer.includes('R1') || event[e].organizer.includes('R2')) && event[e].type === 'Canvass' )
    // && event[e].date === `${year}-${month}-${day}`)
    countedData.push(event[e])
}

countedData.sort((a,b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
})

const fs = require("fs");
console.log(countedData.length)
let json = JSON.stringify(countedData);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')