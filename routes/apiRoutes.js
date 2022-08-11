const router = require("express").Router();
const {
  readFromFile,
  createNewNote,
  readAndAppend,
  deleteNote,
} = require("../lib/notes");
const { v4: uuidv4 } = require("uuid");

// getting data from my db.json file passing the data
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data - passing the notes data to the server and creating a random id w package crypto
router.post("/notes", (req, res) => {
  const newNote = {
    text: req.body.text,
    title: req.body.title,
    id: uuidv4(),
  };
  readAndAppend(newNote, "./db/db.json");
  res.json("added new note!");
});

router.delete("/notes/:id", (req, res) => {
  deleteNote(req.params.id, "./db/db.json");
  res.json("note deleted!");
});

module.exports = router;
