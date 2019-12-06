var db = require("../models");

module.exports = function (app) {

    // route to get completeness of tasks that allows front-end to determine which header is needed
    app.get("/api/headers", function (req, res) {
        db.Todos.findAll().then(function (err, data) {
            if (err) return res.status(500).end();

            let complete = data.filter((task) => {
                return task.done === 1
            })
            let incomplete = data.filter((task) => {
                return task.done === 0
            })
            res.json({ complete, incomplete })
        });
    });

    // post tasks to server when Submit button is clicked
    app.post("/api/tasks", function (req, res) {
        console.log(req.body);
        db.Todos.create({
            task: req.body.todo,
            done: false
        }).then(function (result) {
            res.json(result)
        })
    });

    // get saved tasks and display on /api/tasks page
    app.get("/api/tasks", function (req, res) {
        db.Todos.findAll().then(function (err, data) {
            if (err) return res.status(500).end();
            res.json(data);
        });
    })

    // update status of task from incomplete to complete
    app.put("/api/tasks/:id", function (req, res) {
        db.Todos.update({ done: true },
            {
                where: { id: req.params.id }
            }).then(function (result) {
                res.json(result);
            })
    })

    // clear all tasks
    app.delete("/api/tasks", function (req, res) {
        // { truncate : true, cascade: false }
        db.Todos.destroy({ truncate: true })
            .then(function (result) {
                res.json(result)
            })
    })
}