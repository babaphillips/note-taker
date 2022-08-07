const fs = require("fs");
const util = require("util");
const readFromFile = util.promisify(fs.readFile);

// function findById(id, file) {
//   const result = file.filter((note) => note.id === id)[0];
//   return result;
// }

function createNewNote(destination, content) {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err
      ? console.error(err)
      : console.info(`Data has been written to ${destination}`)
  );
}

function readAndAppend(content, file) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parseData = JSON.parse(data);
      parseData.push(content);
      createNewNote(file, parseData);
    }
  });
}

// function deleteNote(content, file) {}

module.exports = {
  readFromFile,
  createNewNote,
  readAndAppend,
};
