// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Tables reservations (DATA)
// =============================================================
var reservations = [
  {
    routeName: "table 1",
    name: "Yoda",
    phone: "666-6666",
    email: "666@666.com",
    uniqueID: "666"
  },
  {
    routeName: "table 2",
    name: "Darth Maul",
    phone: "777-7777",
    email: "777@777.com",
    uniqueID: "777"
  },
  {
    routeName: "table 3",
    name: "Obi Wan Kenobi",
    phone: "555-5555",
    email: "555@555.com",
    uniqueID: "555"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Tables Page!")
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/tables", function(req, res) {
  // res.send("Welcome to the Tables Page!")
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  // res.send("Welcome to the Tables Page!")
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays a single reservation, or returns false
app.get("/api/reservations/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreservation = req.body;

  console.log(newreservation);

  // We then add the json the user sent to the reservation array
  reservations.push(newreservation);

  // We then display the JSON to the users
  res.json(newreservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
