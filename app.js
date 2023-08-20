// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
// routes setting
app.get("/", (req, res) => {
  // pass the movie data into 'index' partial template
  res.render("index", { restaurants: restaurantList.results });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
