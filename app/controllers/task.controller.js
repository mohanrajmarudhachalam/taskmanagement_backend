const TaskManagement = require("../models/task.model.js")
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const task_management = new TaskManagement({
        task_name: req.body.task_name,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        status: req.body.status
    });
    TaskManagement.create(task_management, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the task_management."
            });
        else res.send(data);
    });
};
 exports.findAll = (req, res) => {
    const title = req.query.title;
  
    TaskManagement.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving taskmanagement."
        });
      else res.send(data);
    });
  };
  exports.findOne = (req, res) => {
    TaskManagement.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found taskmanagement with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving taskmanagement with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };
  exports.findAllPublished = (req, res) => {
    TaskManagement.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving taskmanagement."
        });
      else res.send(data);
    });
  };
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    TaskManagement.updateById(
      req.params.id,
      new Tutorial(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Taskmanagement with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Taskmamagement with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    TaskManagement.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Taskmanagement with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Taskmanagement with id " + req.params.id
          });
        }
      } else res.send({ message: `Taskmanagement was deleted successfully!` });
    });
  };
  exports.deleteAll = (req, res) => {
    TaskManagement.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all task."
        });
      else res.send({ message: `All task were deleted successfully!` });
    });
  };