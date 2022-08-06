// Start by creating a route that the front-end can request data from. Start by requiring the data by adding the following code to the top
const { notes } = require("./data/notes");
// Just like any other npm package, we will require Express.js
const express = require("express");
// Setting up the server only takes two steps: we need to instantiate the server, then tell it to listen for requests. To instantiate the server
const app = express();

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
