// Just like any other npm package, we will require Express.js
const express = require("express");

// Start by creating a route that the front-end can request data from.
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

//When Heroku runs our app, it sets an environment variable called process.env.PORT. We're going to tell our app to use that port, if it has been set, and if not, default to port 3001.
const PORT = process.env.PORT || 3001;

// Setting up the server only takes two steps: we need to instantiate the server, then tell it to listen for requests. To instantiate the server
const app = express();

//You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request

// parse incoming JSON data
app.use(express.json());

// is a method inbuilt in express to recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: true }));

//We added some more middleware to our server and used the express.static() method. The way it works is that we provide a file path to a location in our application (in this case, the public folder) and instruct the server to make these files static resources. This means that all of our front-end code can now be accessed without having a specific server endpoint created for it!
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//The app.listen() function is used to bind and listen the connections on the specified host and port.
app.listen(PORT, () => {
  console.log(`API server now on port 3001!`);
});
