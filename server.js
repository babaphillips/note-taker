// const fs = require("fs");
// const path = require("path");
// const express = require("express");

// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/api", apiRoutes);
// app.use("/", htmlRoutes);

// app.listen(PORT, () => {
//   console.log(`API server now on port ${PORT}!`);
// });

const express = require("express");
const app = express();
const { notes } = require("./data/notes");

function filterByQuery(query, notesArray) {
  //  // Note that we save the notesArray as filteredResults here:
  let filteredResults = notesArray;
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

app.get("/api/notes", (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
