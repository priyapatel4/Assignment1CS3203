const express = require('express')
//const { fstat } = require('fs')
const server = express()
const port = 3000
const fs = require('fs');

server.get('/', (req, res) => {
    var name = "Jay"
    fs.readFile('favs.json', (err, data) => {
        if (err) throw err;
        let student = JSON.parse(data);
        //console.log(student);
        res.send(student)
    });
    
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})