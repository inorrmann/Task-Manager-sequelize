module.exports = function(sequelize, DataTypes) {
    var Todos = sequelize.define("todos", {
        task: DataTypes.STRING,
        done: DataTypes.BOOLEAN
    });
    return Todos;
}