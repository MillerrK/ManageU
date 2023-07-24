class Task {
    public id: number;
    public completed: boolean

    constructor(public description: string) {
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.completed = false;
    }
}

class TaskManager {
    public tasks: Task[];
    constructor() {
        this.tasks = []
    }
    addTask(description: string): void {
        this.tasks.push(new Task(description));
        localStorage.setItem("myTasks", JSON.stringify(this.tasks))
    }
    deleteTask(id: number): void {
        let indexToDelete = this.tasks.findIndex((task: Task) => task.id == id)
        this.tasks.splice(indexToDelete, 1)
        localStorage.setItem("myTasks", JSON.stringify(this.tasks))
    }
    updateTaskDescription(id: number, newDescription: string): void {
        let indexToUpdate = this.tasks.findIndex((task: Task) => task.id == id)
        this.tasks[indexToUpdate].description = newDescription;
        localStorage.setItem("myTasks", JSON.stringify(this.tasks))
    }
    completeTask(id: number): void {
        let indexToUpdate = this.tasks.findIndex((task: Task) => task.id == id)
        this.tasks[indexToUpdate].completed = true;
        localStorage.setItem("myTasks", JSON.stringify(this.tasks))
    }
}


let manager = new TaskManager();
manager.addTask("My first task");

if (localStorage.getItem("myTasks") != null) {
    manager.tasks = JSON.parse(localStorage.getItem("myTasks") as string)
    showTasksInLists()
}

function showTasksInLists() {
    document.getElementById("active")!.innerHTML = "";
    document.getElementById("completed")!.innerHTML = "";
    for (let task of manager.tasks) {
        if (task.completed == false) {
            document.getElementById("active")!.innerHTML += `
     <div class="row">
                <div class="col-9">
                    <li class="list-group-item d-inline-block w-100" style="border-radius: 7px">
                    ${task.description}
                    </li>
                </div>
                <div class="col-3">
                    <span>
                        <button class="btn btn-success" onclick="completeTask(${task.id})">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="btn btn-primary" onclick="updateDescription(${task.id})">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </span>
                </div>
            </div> `;
        } else {
            document.getElementById("completed")!.innerHTML += `
      <div class="row">
                <div class="col-8">
                    <li class="list-group-item d-inline-block w-100 text-decoration-line-through" style="border-radius: 7px">
                    ${task.description}
                    </li>
                </div>
                <div class="col-4">
                    <span>
                        <button class="btn btn-success" onclick="completeTask(${task.id})">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="btn btn-primary" onclick="updateDescription(${task.id})">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn btn-danger" onclick="deleteTask(${task.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </span>
                </div>
            </div> `;
        }
    }
}

showTasksInLists();

function completeTask(id: number) {
    manager.completeTask(id);
    showTasksInLists();
}

function updateDescription(id: number) {
    let newDescription = prompt("Enter new description:");
    if (newDescription != null && newDescription != "") {
        manager.updateTaskDescription(id, newDescription!);
        showTasksInLists();
    } else alert("Sorry! Something went wrong");
}

function deleteTask(id: number) {
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
}

function addNewTask() {
    let description = (document.getElementById("description") as HTMLInputElement).value;
    manager.addTask(description);
    (document.getElementById("description") as HTMLInputElement).value = "";
    showTasksInLists();
}