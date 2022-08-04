//required imports
const cleanData = require('./cleanData.json')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const categoryData = []

// saves column data of JSON file as same categories
const  setCategory=(data)=>{
    for (item in data[0]){
    categoryData.push(item)
    }
}

setCategory(cleanData)

const csvWriter = createCsvWriter({
    path: './export_data.csv',
    header: categoryData.map((item)=>  ({id: item, title: item}))
})

try {
    csvWriter.writeRecords(cleanData)
    .then(()=> {
        console.log("exported file")
    })
} catch (error) {
    console.log(error)
}


    

