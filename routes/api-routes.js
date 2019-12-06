var db = require("../models/");

var router = require("express").Router();

// route to get completeness of tasks that allows front-end to determine which header is needed
router.get("/headers", function (req, res) {
    db.Todos.findAll().then(function  (data) {
        let complete = data.filter((task) => {
            return task.done === true
        })
        let incomplete = data.filter((task) => {
            return task.done === false
        })
        res.json({ complete, incomplete })
    });
});

// post tasks to server when Submit button is clicked
router.post("/tasks", function (req, res) {
    // console.log(req.body);
    db.Todos.create({
        task: req.body.todo,
        done: false
    }).then(function (result) {
        return res.json(result)
    })
});

// get saved tasks and display on /api/tasks page
router.get("/tasks", function (req, res) {
    db.Todos.findAll().then(function (data) {
        return res.json(data);
        // console.log(data);
    });
})

// update status of task from incomplete to complete
router.put("/tasks/:id", function (req, res) {
    db.Todos.update({ done: true },
        {
            where: { id: req.params.id }
        }).then(function (result) {
            return res.json(result);
        })
})

// clear all tasks
router.delete("/tasks", function (req, res) {
    // { truncate : true, cascade: false }
    db.Todos.destroy({ truncate: true })
        .then(function (result) {
            return res.json(result)
        })
})

module.exports = router
