// Start by creating a route that the front-end can request data from. Start by requiring the data by adding the following code to the top
const { notes } = require("./data/notes");
// Just like any other npm package, we will require Express.js
const express = require("express");

//When Heroku runs our app, it sets an environment variable called process.env.PORT. We're going to tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

// Setting up the server only takes two steps: we need to instantiate the server, then tell it to listen for requests. To instantiate the server
const app = express();

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

app.get("/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//A param route must come after the other GET route
app.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});
