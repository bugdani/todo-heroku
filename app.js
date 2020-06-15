const express = require("express");
const app = express();
const {} = require("./db/mongoose");

const bodyParser = require("body-parser");

//Importo los modelos para ser conmidos por los metodos
const { List, Task } = require("./db/model");

//
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
    );

    res.header(
        "Access-Control-Expose-Headers",
        "x-access-token, x-refresh-token"
    );

    next();
});

/**
 * Get /lists
 * Proposito: Devuelve todas las listas
 */
app.get("/lists", (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    });
});

/**
 * Post /lists
 * Proposito: Para crear una nueva lista
 */
app.post("/lists", (req, res) => {
    let title = req.body.title;
    let newList = new List({
        title,
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
});

/**
 * Path /lists
 * Proposito: Para modificar una lista especifica
 */
app.patch("/lists/:id", (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body,
        })
        .then((updateList) => {
            res.send(updateList);
        })
        .catch((err) => {
            res.send({ message: err });
        });
});

/**
 * Patch /lists/:listId/tasks
 * Proposito: Modifica una tarea especifica
 */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndUpdate({
            _id: req.params.taskId,
            _listId: req.params.listId,
        }, {
            $set: req.body,
        })
        .then((updateTask) => {
            res.send(updateTask);
        })
        .finally((tasks) => {
            res.send(tasks);
        })
        .catch((err) => {
            res.send({ message: err });
        });
});

/**
 * Delete /lists
 * Proposito: Para eliminar una lista especifica
 */
app.delete("/lists/:id", (req, res) => {
    List.findOneAndDelete({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});

/**
 * Get /Task
 * Proposito: Devuelve todas las tareas de una lista
 */
app.get("/lists/:listId/tasks", (req, res) => {
    Task.find({
        _listId: req.params.listId,
    }).then((tasks) => {
        res.send(tasks);
    });
});

/**
 * Get /lists/:listId/tasks/:taskId
 * Proposito:Devuelve una tarea en particular
 */
app.get("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.find({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }).then((tasks) => {
        res.send(tasks);
    });
});

/**
 * Get /lists/:listId/tasks
 * Proposito: Obtiene todas las tareas de una lista
 */
app.post("/lists/:listId/tasks", (req, res) => {
    let newTask = Task({
        title: req.body.title,
        dateCreated: new Date(),
        _listId: req.params.listId,
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});

/**
 * Delete /lists/:listId/tasks
 * Proposito: Elimina una tarea especifica
 */
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    Task.findOneAndDelete({
        _id: req.params.taskId,
        _listId: req.params.listId,
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    });
});

/**
 * Delete  /lists/:listId/tasks
 * Proposito: Eliminar todas las tareas de una lista
 */
app.delete("/lists/:listId/tasks", (req, res) => {
    Task.findOneAndDelete({
        _listId: req.params.listId,
    }).then((removedTasksDoc) => {
        res.send(removedTasksDoc);
    });
});

app.listen(3000, () => {
    console.log("El servidor ya esta escuchando peticiones!! ;)");
});