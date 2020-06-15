//JS necesario para conectarse a la base de datos realizada en Mongo DB

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost:27017/ToDoManager", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Conexion establecida con MongoDB");
    })
    .catch((err) => {
        console.log("Hubo un error en la conexion a MongoDB");
        console.log(err);
    });

//Para que no me aparezcan advertencias innecesarias por deprecation
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
    mongoose,
};