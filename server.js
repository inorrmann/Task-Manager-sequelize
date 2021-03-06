var express = require("express");
var db = require("./models/");
const exphbs = require("express-handlebars");


var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// require the routes that will be used for the front end (html) and backend (api routes)
const apiRoutes = require("./routes/api-routes.js");
const htmlRoutes = require("./routes/html-routes.js");
app.use("/api/", apiRoutes)
app.use("/", htmlRoutes)


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on http://localhost:" + PORT);
    });
});