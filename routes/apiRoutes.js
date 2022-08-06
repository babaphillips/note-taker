const router = require("express").Router();
const { readFromFile, createNewNote, readAndAppend } = require("../lib/notes");

router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//POST requests differ from GET requests in that they represent the action of a client requesting the server to accept data
router.post("/notes", (req, res) => {
  // set id based on what the next index of the array will be

  readAndAppend(req.body, "./db/db.json");
  res.json("added new note!");
});

// router.delete("/notes/:id", (req, res) => {
//   const result = findById(req.params.id, notes);
//   deleteNote();
// });

module.exports = router;
