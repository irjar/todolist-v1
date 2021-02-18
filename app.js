// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// list of items to be displayed when the users opens the web page
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// display today's day of the week and month
app.get("/", function(req, res) {

  const day = date.getDate();
  // render the list file with the variables listTitle and newListItems
  res.render('list', {
    listTitle: day,
    newListItems: items
  });
})

// regirect to the home route or to the work route depending on
// whether the item was added in the work list or the default list
app.post("/", function(req, res) {
  console.log(req.body);
  const item = req.body.newItem;

if (req.body.list === "Work") {    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})

// render the work list with the variables listTitle and newListItems
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
})

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
