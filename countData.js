console.log('counting data')
// require files here!
const dataToCount = require('./ignore/data.json')
//Don't change this import though!
const fs = require("fs")

//counts Survey Responses, logs to console, comment in function to use!
// countSurveyResponses(dataToCount)

// Counts Contact Types, logs to console, comment in function to use!
// countContactTypes(dataToCount)

const countSurveyResponses=(table)=> {
    let one = 0
    let two = 0
    let three = 0
    let four = 0
    let five = 0
    for (data in table){
     if (table[data]["Survey Question Name"][0] === '1') one++
     if (table[data]["Survey Question Name"][0] === '2') two++
     if (table[data]["Survey Question Name"][0] === '3') three++
     if (table[data]["Survey Question Name"][0] === '4') four++
     if (table[data]["Survey Question Name"][0] === '5') five++
    }
console.log(table.length)
console.log(`1:${one}, 2: ${two}, 3: ${three}, 4: ${four}, 5: ${five} `)
}

const countContactTypes = (table)=> {
    let canvass = 0
    let refused = 0
    let hostile = 0
    let leftMessage = 0
    let litDropped = 0
    let disconnected = 0
    let notHome = 0
    let texted = 0
    let inaccessible = 0
    let moved = 0
    let wrongNum = 0
for (data in table){
    if (table[data]["Contact Type"] === "Canvassed") canvass++
    if (table[data]["Contact Type"] === "Refused") refused++
    if (table[data]["Contact Type"] === "Hostil") hostile++
    if (table[data]["Contact Type"] === "Left Message") leftMessage++
    if (table[data]["Contact Type"] === "Lit Dropped") litDropped++
    if (table[data]["Contact Type"] === "Disconnected") disconnected++
    if (table[data]["Contact Type"] === "Not Home") notHome++
    if (table[data]["Contact Type"] === "Texted") texted++
    if (table[data]["Contact Type"] === "Inaccessible") inaccessible++
    if (table[data]["Contact Type"] === "Moved") moved++
    if (table[data]["Contact Type"] === "Wrong Number") wrongNum++
}

console.log(`Canvassed ${canvass}, Refused ${refused}, Hostil ${hostile},
Left Message ${leftMessage}, Lit Dropped ${litDropped}, 
Disconnected ${disconnected}, Not Home ${notHome}
Texted ${texted}, Inaccessible ${inaccessible}, Moved ${moved}, 
Wrong Number ${wrongNum}`)
}


const countAndReturnData =(table)=> {
    const volunteer = {}
    for (data in table){
        let person = table[data].VANID
        let type = helper(table[data])
        if (!volunteer[person]){
            volunteer[person] = {
                vanId: person,
                name: table[data]['Contact Name'].join(','),
                sign_ups: 0,
                shifts_completed: 0,
                completion_percent: 0,
                event_date: []
            }
            volunteer[person][type[0]] = 1
            volunteer[person].event_date.push(type[1])
        } else {
            volunteer[person][type[0]]++ 
            volunteer[person].event_date.push(type[1])
        }
        if (type[0] === 'shifts_completed') volunteer[person].sign_ups++
    }
    return volunteer
}

const helper=(person)=> {
    let now = new Date()
    let period = new Date(now.setDate(now.getDate() - 30))
    let eventDate = new Date(person["Event Date"])
    let date = eventDate >= period && person.Status === 'Completed' ? true : false
    if (person.Status === 'Completed') return [`shifts_completed`, date]
    return ['sign_ups', date]
}

const sortData = (array)=> {
    array.sort((a,b)=> {
        if (a.Completion_Percent > b.Completion_Percent) return -1
        if (a.Completion_Percent < b.Completion_Percent ) return 1          
        return 0
    })
    return array
    }
const myCount = (item, array) => {
    let count = 0
    for (i of array){
        if (i === item) count++
    }
    if (count > 1) return 'Active'
    if (count === 1) return "Almost Active"
    return 'Inactive'
}
const countAndReturnDataAsJson = (data) => {
    
    const active = []
    const almost = []
    const inactive = []
    const volunteers = countAndReturnData(data)
    for (person in volunteers){
        volunteers[person].completion_percent = ((volunteers[person].shifts_completed) / (volunteers[person].sign_ups))
        let record = {
            Van_Id: volunteers[person].vanId,
            Full_Name: volunteers[person].name,
            Sign_Ups: volunteers[person].sign_ups,
            Completed: volunteers[person].shifts_completed,
            Completion_Percent: volunteers[person].completion_percent,
            status: myCount(true, volunteers[person].event_date)
        }
        if (record.status === 'Active') active.push(record)
        if (record.status === 'Almost Active') almost.push(record)
        if (record.status === 'Inactive') inactive.push(record)
    }   
    const tier1 = sortData(active)
    const tier2 = sortData(almost)
    const tier3 = sortData(inactive)

    const newJsonFile = [...tier1, ...tier2, ...tier3]
    
  
    
    const json = JSON.stringify(newJsonFile)
    fs.writeFileSync('./ignore/cleanData.json', json)
    console.log('File Generated: cleanData.json')
}

// returns newJSON file with counted data
countAndReturnDataAsJson(dataToCount)