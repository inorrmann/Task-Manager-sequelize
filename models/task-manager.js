module.exports = function(sequelize, DataTypes) {
    var Todos = sequelize.define("Todos", {
        task: DataTypes.STRING,
        done: DataTypes.BOOLEAN
    });
    return Todos;
}