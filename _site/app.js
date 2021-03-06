var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var data = {};

express()
  .use(bodyParser.urlencoded({ extended: false }))
  .get('/save', function(req, res) {
    let fileName = `attendees-${new Date().format('m-d-Y')}`;
    fs.writeFile(fileName, JSON.stringify(data, null, 4));
    console.log("File saved to " + fileName);
    return res.json(data); })
  .post('/attendance', function (req, res) {
    if (req.body["netid"] && req.body["github"]) {
      data[req.body["netid"]] = req.body["github"];
      res.send('Attendance received!');
      console.log("Attendance recieved for " + req.body["netid"]);
    } else {
      console.log("Attendance submission failed");
      res.send('Attendance submission failed!');
    }
  })
  .listen(3001);
