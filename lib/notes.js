const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);

// function findById(id, notesArray) {
//   const result = notesArray.filter((note) => note.id === id)[0];
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
module.exports = {
  readFromFile,
  // findById,
  createNewNote,
  readAndAppend,
};
