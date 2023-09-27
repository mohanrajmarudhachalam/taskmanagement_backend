const sql = require('./db.js')
const TaskManagement = function (taskmanagment) {
    this.task_name = taskmanagment.task_name;
    this.start_time = taskmanagment.start_time;
    this.end_time = taskmanagment.end_time;
    this.status = taskmanagment.status;
}

TaskManagement.create = (newTask, result) => {
    sql.query("INSERT INTO task_details SET ?", newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.task_name, ...newTask });
        result(null, { id: res.task_name, ...newTask });
    });
};

TaskManagement.findById = (id, result) => {
    sql.query(`SELECT * FROM task_details WHERE task_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

TaskManagement.getAll = (task, result) => {
    let query = "SELECT * FROM task_details";

    if (task) {
        query += ` WHERE task_name LIKE '%${task}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("task_details: ", res);
        result(null, res);
    });
};



TaskManagement.updateById = (id, newTask, result) => {
    sql.query(
        "UPDATE task_details SET task_name = ?, start_time = ?,end_time = ?, status = ? WHERE task_id = ?",
        [newTask.taskname, newTask.start_time, newTask.end_time, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {

                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated task_details: ", { id: id, ...newTask });
            result(null, { id: id, ...newTask });
        }
    );
};

TaskManagement.remove = (id, result) => {
    sql.query("DELETE FROM task_details WHERE task_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted task with id: ", id);
        result(null, res);
    });
};

TaskManagement.removeAll = result => {
    sql.query("DELETE FROM task_details", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} task_details`);
        result(null, res);
    });
};
module.exports= TaskManagement;