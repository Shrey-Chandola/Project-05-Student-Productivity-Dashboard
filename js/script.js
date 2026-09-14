const taskForm = document.querySelector(".task-input");
const taskInput = document.querySelector("#add-task");
const taskList = document.querySelector(".task-list");
const completedCount = document.querySelector(".overview-card strong");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [
    {
        name: "Complete DSA Arrays Practice",
        status: "Pending"
    },
    {
        name: "Study Javascript DOM",
        status: "In Progress"
    },
    {
        name: "Work on Portfolio Project",
        status: "Pending"
    }
];


/* Display Tasks */

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const taskArticle = document.createElement("article");
        taskArticle.classList.add("task");

        const taskName = document.createElement("p");
        taskName.textContent = task.name;

        const statusSelect = document.createElement("select");

        const statuses = ["Pending", "In Progress", "Completed"];

        statuses.forEach(function(status) {
            const option = document.createElement("option");

            option.value = status;
            option.textContent = status;

            if (task.status === status) {
                option.selected = true;
            }

            statusSelect.appendChild(option);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-task");

        taskArticle.appendChild(taskName);
        taskArticle.appendChild(statusSelect);
        taskArticle.appendChild(deleteButton);

        taskList.appendChild(taskArticle);

        /* Change Status */

        statusSelect.addEventListener("change", function() {
            tasks[index].status = statusSelect.value;

            saveTasks();
            updateCompletedCount();
        });

        /* Delete Task */

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
            updateCompletedCount();
        });
    });

    updateCompletedCount();
}


/* Add Task */

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        return;
    }

    const newTask = {
        name: taskName,
        status: "Pending"
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
});


/* Save Tasks */

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


/* Update Completed Count */

function updateCompletedCount() {

    const completedTasks = tasks.filter(function(task) {
        return task.status === "Completed";
    });

    completedCount.textContent = completedTasks.length + " / " + tasks.length;
}


/* Initial Display */

displayTasks();