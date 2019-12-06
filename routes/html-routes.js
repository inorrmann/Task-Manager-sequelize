var db = require("../models/");

// require the router function from express that will
// handle delivering the necessary data to the front and back end
var router = require("express").Router();


router.get("/", function (req, res) {
    console.log(db.Todos)
    db.Todos.findAll().then(function (data) {
        console.log(data)
        let todosNotDone = [];
        let todosDone = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].done === 0) {
                todosNotDone.push(data[i]);
            }
            else if (data[i].done === 1) {
                todosDone.push(data[i]);
            }
        }
        return res.render("index", { todosIncomplete: todosNotDone, todosComplete: todosDone });
        // return res.render("index");
    });
});


module.exports = router;