const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); 
const flash = require("connect-flash");
const routes = require("./routes");
const usePassport = require("./config/passport");
const port = 3000;

require("./config/mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));
usePassport(app);
app.use(flash())  // 掛載套件

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated(); 
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
