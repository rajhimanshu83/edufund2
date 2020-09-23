const path = require('path');
const fs = require('fs');
//joining path of directory 

const readFile = (folder) =>
  new Promise((resolve, reject) => {
    const directoryPath = path.join(__dirname, folder);
      fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            if (err) reject(err)
        } 
        else resolve(files)
    });
  })
  module.exports = readFile;

