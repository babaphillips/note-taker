// const router = require("express").Router();
// const {
//   filterByQuery,
//   findById,
//   createNewAnimal,
//   validateAnimal,
// } = require("../../lib/notes.js");
// const { notes } = require("../../db/db.json");

// router.get("/notes", (req, res) => {
//   let results = notes;
//   if (req.query) {
//     results = filterByQuery(req.query, results);
//   }
//   res.json(results);
// });

// router.get("/notes/:id", (req, res) => {
//   const result = findById(req.params.id, notes);
//   if (result) {
//     res.json(result);
//   } else {
//     res.send(404);
//   }
// });

// router.post("/notes", (req, res) => {
//   // set id based on what the next index of the array will be
//   req.body.id = notes.length.toString();

//   if (!validateAnimal(req.body)) {
//     res.status(400).send("The animal is not properly formatted.");
//   } else {
//     const animal = createNewAnimal(req.body, notes);
//     res.json(notes);
//   }
// });

// module.exports = router;
