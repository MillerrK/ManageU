"use strict";
class Task {
    constructor(description) {
        this.description = description;
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.completed = false;
    }
}
let task1 = new Task("HW");
console.log(task1);
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    addTask(description) {
        this.tasks.push(new Task(description));
    }
    deleteTask(id) {
        let indexToDelete = this.tasks.findIndex((task) => task.id == id);
        this.tasks.splice(indexToDelete, 1);
    }
    updateTaskDescription(id, newDescription) {
        let indexToUpdate = this.tasks.findIndex((task) => task.id == id);
        this.tasks[indexToUpdate].description = newDescription;
    }
    completeTask(id) {
        let indexToUpdate = this.tasks.findIndex((task) => task.id == id);
        this.tasks[indexToUpdate].completed = true;
    }
}
let manager = new TaskManager();
manager.addTask("Dishes");
manager.addTask("Home Work");
console.log(manager.tasks);
// function showTasksInTable(): void {
//     for (let task of manager.tasks) {
//         document.getElementById(
//             "tasks"
//         )!.innerHTML += `<tr> <td> ${task.id} </td> <td> ${task.description} </td> <td> ${task.completed} </td> </tr>`;
//     }
// }
// showTasksInTable();
function showTasksInLists() {
    document.getElementById("active").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    for (let task of manager.tasks) {
        if (task.completed == false) {
            document.getElementById("active").innerHTML += `
     <div> <li class="list-group-item d-inline-block w-50">${task.description}</li> <span> <button class="btn btn-success" onclick="completeTask(${task.id})"><i class="fa-solid fa-check"></i></button> <button class="btn btn-primary" onclick="updateDescription(${task.id})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button></span> </div> `;
        }
        else {
            document.getElementById("completed").innerHTML += `
      <div> <li class="list-group-item d-inline-block w-50 text-decoration-line-through">${task.description}</li> <span> <button class="btn btn-success" disabled><i class="fa-solid fa-check-double"></i></button> <button class="btn btn-primary" disabled><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" disabled><i class="fa-solid fa-trash"></i></button></span> </div> `;
        }
    }
}
showTasksInLists();
function completeTask(id) {
    manager.completeTask(id);
    showTasksInLists();
}
function updateDescription(id) {
    // prompt for new description
    let newDescription = prompt("Enter new description:");
    if (newDescription != null && newDescription != "") {
        manager.updateTaskDescription(id, newDescription);
        showTasksInLists();
    }
    else
        alert("Sorry! Something went wrong");
}
function deleteTask(id) {
    // confirm "Are you sure?"
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
}
function addNewTask() {
    let description = document.getElementById("description")
        .value;
    manager.addTask(description);
    document.getElementById("description").value = "";
    showTasksInLists();
}
