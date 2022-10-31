const data = require('./ignore/data.json');
//  let R1V2 =  { name: 'R1V2', 
//     schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
//    let R1V3 = {name: 'R1V3',
//     schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
//    let R2V6 = {name: 'R2V6', 
//         schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
//    let R2V7 = {name: 'R2V7', 
//     schedPhone: 0, schedCanvass: 0,
//     completedPhone: 0, completedCanvass: 0}
//    let R3 = {name: 'R3', 
//         schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
//     let R5 = {name: 'R5', 
//     schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
//     let R6 = {name: 'R6', 
//         schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
//     let R7 = {name: 'R7',
//         schedPhone: 0, schedCanvass: 0,
//         completedPhone: 0, completedCanvass: 0}
    const event = {}
    const countedData = []
const today = new Date
    today.setDate(today.getDate() - 1) //comment out for today, leave in for yesterday, decrease by 1/day 
const day = today.getDate()
const month = today.getMonth() + 1
const year = today.getFullYear()

// let ping = 0
// let pong = 0
// const helper = (data, num1, num2) => {
//     if (num2 === 'R3'){
//         let temp = R3[data]
//         temp++
//         R3[data] = temp
//     }
//     if (num2 === 'R5'){
//         let temp = R5[data]
//         temp++
//         R5[data] = temp
//     }
//     if (num2 === 'R6'){
//         let temp = R6[data]
//         temp++
//         R6[data] = temp
//     }
//     if (num2 === 'R7'){
//         let temp = R7[data]
//         temp++
//         R7[data] = temp
//     }
//     if (num2 === 'R1' && num1 === '2'){
//         let temp = R1V2[data]
//         temp++
//         R1V2[data] = temp
//     }
//     if (num2 === 'R1' && num1 === '3'){
//         let temp = R1V3[data]
//         temp++
//         R1V3[data] = temp
//     }
//     if (num2 === 'R2' && num1 === '6'){
//         let temp = R2V6[data]
//         temp++
//         R2V6[data] = temp
//     }
//     if (num2 === 'R2' && num1 === '7'){
//         let temp = R2V7[data]
//         temp++
//         R2V7[data] = temp
//     }
// }
// for (id in data){
//     let num1 = data[id]["DCCC Volunteer Organizing Turf: DCCC Volunteer Team"]
//     let num2 = data[id][["DCCC Volunteer Organizing Turf: DCCC Volunteer Organizer"]]
//     if (data[id]['Signup Date'] === `${year}-${month}-${day}`){ 
//         ping++
//         data[id]["Role"] === 'Canvasser' ? helper('schedCanvass', num1, num2) : null
//         data[id]["Role"] === 'Phonebanker' ||  data[id]["Role"] === 'Textbanker' ?  helper('schedPhone', num1, num2) : null

//     }
//     if (data[id]['Event Date']=== `${year}-${month}-${day}`){
//         pong++
//         data[id]["Role"] === 'Canvasser' ?  helper('completedCanvass', num1, num2): null
//         data[id]["Role"] === 'Phonebanker' ||  data[id]["Role"] === 'Textbanker' ?  helper('completedPhone', num1, num2): null
//     }
// }

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
// console.log('ping', ping, "pong", pong)
// const countedData = [R1V2, R1V3, R2V6, R2V7, R3, R5, R6, R7]

const fs = require("fs");
console.log(countedData.length)
let json = JSON.stringify(countedData);
fs.writeFileSync('./ignore/cleanData.json', json)
console.log('File Generated: cleanData.json')