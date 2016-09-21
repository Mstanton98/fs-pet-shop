#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const cmd = process.argv[2];

if (!cmd) {
  console.error(`Usage: node pets.js [read | create | update | destroy]`)
  process.exit(1);
} else if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) throw err;

    const pets = JSON.parse(data);
    const pet = process.argv[3];



    if (pet && pets[pet] === undefined) {

      console.error(`Usage: pets index ${pet} is not found. Please try a number between 0 and ${pets.length}`)
      process.exit(1);

    } else if (pet && pets[pet] !== -1) {

        console.log(pets[pet]);

    } else {

    console.log(pets);
    };
  });
} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (newErr, data) => {
    if(newErr) throw newErr;

    const pets = JSON.parse(data);
    const age = parseInt(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];

    if(age === undefined || kind === undefined || name === undefined) {

      console.error(`Usage: node pets.js create AGE KIND NAME`);

      process.exit(1);

    } else if(age && kind && name) {
      const newPet = { age, kind, name};
      pets.push(newPet);
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if(writeErr) throw writeErr;
        console.log(newPet);
      })
    }
  });
}
// (`,{ "age":${age},"kind":"${kind}","name":"${name}" }`);
