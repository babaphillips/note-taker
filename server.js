// Just like any other npm package, we will require Express.js
const express = require("express");

// Start by creating a route that the front-end can request data from. Start by requiring the data by adding the following code to the top

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//When Heroku runs our app, it sets an environment variable called process.env.PORT. We're going to tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

// Setting up the server only takes two steps: we need to instantiate the server, then tell it to listen for requests. To instantiate the server
const app = express();

//We added some more middleware to our server and used the express.static() method. The way it works is that we provide a file path to a location in our application (in this case, the public folder) and instruct the server to make these files static resources. This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
// parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// parse incoming string or array data

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});
