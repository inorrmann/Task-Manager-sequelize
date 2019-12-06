var db = require("../models/");

// require the router function from express that will
// handle delivering the necessary data to the front and back end
var router = require("express").Router();


router.get("/", function (req, res) {
    // console.log(db.Todos)
    db.Todos.findAll().then(function (data) {
        let todosNotDone = [];
        let todosDone = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].dataValues.done === false) {
                todosNotDone.push(data[i].dataValues);
            }
            else if (data[i].dataValues.done === true) {
                todosDone.push(data[i].dataValues);
            }
        }
        return res.render("index", { todosIncomplete: todosNotDone, todosComplete: todosDone });
    });
});


module.exports = router;