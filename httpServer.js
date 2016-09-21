'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const petsPath = path.join(__dirname, 'pets.json');
const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  const petRegExp = /^\/pets\/(.*)$/;
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if(err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      };
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 200;
      res.end(data);
    });
  }else if(req.method === 'GET' && petRegExp.test(req.url)) {
    fs.readFile(petsPath, 'utf8', (err, data) => {
      if(err) throw err;

      const matches = req.url.match(petRegExp);
      const id = Number.parseInt(matches[1]);
      const pets = JSON.parse(data);

      if(id < 0 || id >= pets.length || Number.isNaN(id)) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Not Found');
      }
      const petJSON = JSON.stringify(pets[id]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
module.exports = server;
