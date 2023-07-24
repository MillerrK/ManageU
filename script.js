var Task = /** @class */ (function () {
    function Task(description) {
        this.description = description;
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.completed = false;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    TaskManager.prototype.addTask = function (description) {
        this.tasks.push(new Task(description));
        localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    };
    TaskManager.prototype.deleteTask = function (id) {
        var indexToDelete = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks.splice(indexToDelete, 1);
        localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    };
    TaskManager.prototype.updateTaskDescription = function (id, newDescription) {
        var indexToUpdate = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[indexToUpdate].description = newDescription;
        localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    };
    TaskManager.prototype.completeTask = function (id) {
        var indexToUpdate = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[indexToUpdate].completed = true;
        localStorage.setItem("myTasks", JSON.stringify(this.tasks));
    };
    return TaskManager;
}());
var manager = new TaskManager();
manager.addTask("My first task");
if (localStorage.getItem("myTasks") != null) {
    manager.tasks = JSON.parse(localStorage.getItem("myTasks"));
    showTasksInLists();
}
function showTasksInLists() {
    document.getElementById("active").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    for (var _i = 0, _a = manager.tasks; _i < _a.length; _i++) {
        var task = _a[_i];
        if (task.completed == false) {
            document.getElementById("active").innerHTML += "\n     <div class=\"row\">\n                <div class=\"col-9\">\n                    <li class=\"list-group-item d-inline-block w-100\" style=\"border-radius: 7px\">\n                    ".concat(task.description, "\n                    </li>\n                </div>\n                <div class=\"col-3\">\n                    <span>\n                        <button class=\"btn btn-success\" onclick=\"completeTask(").concat(task.id, ")\">\n                            <i class=\"fa-solid fa-check\"></i>\n                        </button>\n                        <button class=\"btn btn-primary\" onclick=\"updateDescription(").concat(task.id, ")\">\n                            <i class=\"fa-solid fa-pen\"></i>\n                        </button>\n                        <button class=\"btn btn-danger\" onclick=\"deleteTask(").concat(task.id, ")\">\n                            <i class=\"fa-solid fa-trash\"></i>\n                        </button>\n                    </span>\n                </div>\n            </div> ");
        }
        else {
            document.getElementById("completed").innerHTML += "\n      <div class=\"row\">\n                <div class=\"col-8\">\n                    <li class=\"list-group-item d-inline-block w-100 text-decoration-line-through\" style=\"border-radius: 7px\">\n                    ".concat(task.description, "\n                    </li>\n                </div>\n                <div class=\"col-4\">\n                    <span>\n                        <button class=\"btn btn-success\" onclick=\"completeTask(").concat(task.id, ")\">\n                            <i class=\"fa-solid fa-check\"></i>\n                        </button>\n                        <button class=\"btn btn-primary\" onclick=\"updateDescription(").concat(task.id, ")\">\n                            <i class=\"fa-solid fa-pen\"></i>\n                        </button>\n                        <button class=\"btn btn-danger\" onclick=\"deleteTask(").concat(task.id, ")\">\n                            <i class=\"fa-solid fa-trash\"></i>\n                        </button>\n                    </span>\n                </div>\n            </div> ");
        }
    }
}
showTasksInLists();
function completeTask(id) {
    manager.completeTask(id);
    showTasksInLists();
}
function updateDescription(id) {
    var newDescription = prompt("Enter new description:");
    if (newDescription != null && newDescription != "") {
        manager.updateTaskDescription(id, newDescription);
        showTasksInLists();
    }
    else
        alert("Sorry! Something went wrong");
}
function deleteTask(id) {
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
}
function addNewTask() {
    var description = document.getElementById("description").value;
    manager.addTask(description);
    document.getElementById("description").value = "";
    showTasksInLists();
}
