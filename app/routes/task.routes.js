module.exports = app =>{
    const task =require("../controllers/task.controller.js");
    var router = require("express").Router();
    router.post("/", task.create);
    router.get("/", task.findAll);
    router.get("/:id", task.findOne);
    router.put("/:id", task.update);
    router.delete("/:id", task.delete);
    router.delete("/", task.deleteAll);
    app.use('/api/taskmanagement', router);
}