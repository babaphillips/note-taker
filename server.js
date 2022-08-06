// Start by creating a route that the front-end can request data from. Start by requiring the data by adding the following code to the top
const { notes } = require("./data/notes");
// Just like any other npm package, we will require Express.js
const express = require("express");

//When Heroku runs our app, it sets an environment variable called process.env.PORT. We're going to tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

// Setting up the server only takes two steps: we need to instantiate the server, then tell it to listen for requests. To instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

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
  // req.query is multifaceted, often combining multiple parameters
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//A param route must come after the other GET route - whereas req.param is specific to a single property, often intended to retrieve a single record.
app.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    //We chose to return an error here instead of an empty object or undefined in order to make it clear to the client that the resource they asked for, in this case a specific note, does not exist.
    res.send(404);
  }
});

//POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa.
app.post("/notes", (req, res) => {
  // req.body is where our incoming content will be
  console.log(req.body);
  res.json(req.body);
});

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});
