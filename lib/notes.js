const fs = require("fs");
const path = require("path");

//This function will take in req.query as an argument and filter through the notes accordingly, returning the new filtered array
function filterByQuery(query, notesArray) {
  // new var filteredResults will equals notesArray parameter
  let filteredResults = notesArray;
  // filtering thru titles on notes
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  if (query.text) {
    filteredResults = filteredResults.filter(
      (note) => note.text === query.text
    );
  }
  return filteredResults;
}

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../data/notes.json"),
    //The other two arguments used in the method, null and 2, are means of keeping our data formatted. The null argument means we don't want to edit any of our existing data; if we did, we could pass something in there. The 2 indicates we want to create white space between our values to make it more readable.
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  // return finished code to post route for response
  return note;
}

function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
};
