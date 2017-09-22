const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res)=>{

  // let url = (req.url.slice(1).slice('/');

  //create if statment to print json file/ create /pets route
  //req.url return everything after colon in browser URL

  fs.readFile('./pets.json', 'utf8', (err, data) => {
    //parsing right away to use it for searching the index
    let parsedData = JSON.parse(data);
    //using length of JSON object for testing logic
    let length = parsedData.length;

    if(req.url === '/pets'){
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      //sends data in str format to browser
      res.end(data);
    } else if(req.url.length > 6){
        //getting 'index' of URL /pets/'index'
        let index = req.url.slice(6);
        if(index >= length){
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found')
        } else if(index < 0){
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Not Found')
        }
        //turning JSON object back into a str to send to browser
        let reStringify = JSON.stringify(parsedData[index]);
        res.end(reStringify);
    }

  });
});


server.listen(8000);
module.exports = server;
