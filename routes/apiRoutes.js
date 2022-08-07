const router = require("express").Router();
const crypto = require("crypto");
const {
  readFromFile,
  findById,
  createNewNote,
  readAndAppend,
} = require("../lib/notes");

// getting data from my db.json file passing the data
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data - passing the notes data to the server and creating a random id w package crypto
router.post("/notes", (req, res) => {
  req.body.id = crypto.randomUUID();
  readAndAppend(req.body, "./db/db.json");
  res.json("added new note!");
});

router.delete("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  deleteNote();
});

module.exports = router;
