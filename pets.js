
//if two arguments print instuctions
if (process.argv.length == 2) {
  console.log("Usage: node pets.js [read | create | update | destroy]");
} else {
  const fs = require('fs');
  //will need to read file everytime in order to use it.
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    //need to parse the json file in order to use it. saved as vaiable
    let myData = JSON.parse(data);
    //if index 3 equals 'read' do this, check for 'read'
    if (process.argv[2] == 'read') {
      //if there are three arguments print parsed json file
      if (process.argv.length == 3) {
        console.log(myData);
        //check to make sure there are 4 arguments, and that the 4th argument is within the bounds.
        //selecting an indiviual index/object in the array.
      } else if (process.argv.length == 4 && process.argv[3] < myData.length && process.argv[3] >= 0) {
        //printing object in the array based on valid index.
        console.log(myData[process.argv[3]]);
      } else { //else error
        console.log('Usage: node pets.js read INDEX');
      }
    }
    //if index 3 equals 'create' do this, check for 'create'
    if (process.argv[2] == 'create') {
      //checking for correct number of imputs.
      if (process.argv.length !== 6) {
        console.log('Usage: node pets.js create AGE KIND NAME'); //else error
      } else {
        //checking that age is an integer,
        if (!Number.isInteger(parseInt(process.argv[3]))) {
          console.log('Age must be a number!');
        } else {
          //pushing to pets.json file
          myData.push({
            age: parseInt(process.argv[3]),
            kind: process.argv[4],
            name: process.argv[5]
          });
          //converting to json to be written to file
          let newData = JSON.stringify(myData);
          fs.writeFile('./pets.json', newData, (err) => {});
        }
      }
    }
    //checking for update
    if(process.argv[2] == 'update'){
      if(process.argv.length !== 7){
        console.log('Usage: node pets.js update INDEX AGE KIND NAME');
      }
      else{
        if (!Number.isInteger(parseInt(process.argv[4]))){
          console.error('Age must be a number');
        } else{
          //array...index..obj..keyProperty = turning 5th arg into a number
          myData[process.argv[3]].age = parseInt(process.argv[4]);
          myData[process.argv[3]].kind = process.argv[5];
          myData[process.argv[3]].name = process.argv[6];
          console.log(myData[process.argv[3]]);
          let newData = JSON.stringify(myData);
          fs.writeFile('./pets.json', newData, (err) => {});
        }
      }
    }
    if(process.argv[2] == 'destroy'){
      if(process.argv.length !==4){
        console.error('Usage: node pets.js destroy INDEX');
      } else{
        console.log(myData[process.argv[3]]);
        myData.splice(process.argv[3],1);
        let newData = JSON.stringify(myData);
        fs.writeFile('./pets.json', newData, (err) => {});
      }
    }
  }); //starting line 8
}
