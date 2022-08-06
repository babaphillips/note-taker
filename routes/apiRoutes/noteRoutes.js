const router = require("express").Router();
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../../lib/notes");
const { notes } = require("../../data/notes");

router.get("/notes", (req, res) => {
  let results = notes;
  // req.query is multifaceted, often combining multiple parameters
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//A param route must come after the other GET route - whereas req.param is specific to a single property, often intended to retrieve a single record.
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    //We chose to return an error here instead of an empty object or undefined in order to make it clear to the client that the resource they asked for, in this case a specific note, does not exist.
    res.send(404);
  }
});

//POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data rather than vice versa.
router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be
  //Now when we receive new post data to be added to the notes.json file, we'll take the length property of the notes array and set that as the id for the new data. Remember, the length property is always going to be one number ahead of the last index of the array so we can avoid any duplicate values.
  req.body.id = notes.length.toString();
  // if any data in req.body is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    //add note to json file and animals array in this function
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
