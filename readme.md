# CSV Cleaner
The purpose of this app is to clean data in CSV files. More specificly to remove duplicates in 2 CSV files.
It does this by 1st converting the CSV (Comma Seperated Values) into a JSON (JavaScript Object Notation)file (so we can manipulate the data).
The file here removes duplicate entries, like if you want to extract the old donors from an up to date donor list.
Feel free to change the code to modify whatever you need to. Then it converts the new JSON file back to a CSV so 
non-tech people will be able to review the data.

## Instructions
- clone this repository
- npm install
- cd into "Report Cleaner" (if not there already)
- add the CSV files you want to change in the Report_Cleaner folder
- change "filename" on line 8 in convertToJSON.js, to the file you want to convert
- run ```npm run json``` (creates the JSON file, run for each file to work with)
- make sure the files you wanted to work with have been converted to JSON
- change lines 3 & 4 of "dataClean.js" to files you want to compare (but keep the './' this is the path to the file)
- run ```npm run clean``` (is currently set to remove duplicates, you can change to whatever you need it to)
- run ```convertToCSV.js``` (converts NEW JSON file to CSV)

## Requirements
- Node
- IDE
- JavaScript
- CSV files to manipulate

# Issues
- send an email to brendon.biagi@digidems.com
- I can also be reached via slack message

## Pull Requests
- Please contact me before submitting pull requests (any submitted without contacting me 1st will be rejected)
