document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach((taskText, index) => {
            addTaskToDOM(taskText, index);
        });
    }

    function addTaskToDOM(taskText, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit">Editar</button>
                <button class="delete">Excluir</button>
            </div>
        `;
        taskList.appendChild(li);

        li.querySelector(".delete").addEventListener("click", function() {
            deleteTask(index);
        });

        li.querySelector(".edit").addEventListener("click", function() {
            editTask(index, taskText);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
        loadTasks();
    }

    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    function editTask(index, oldText) {
        const newText = prompt("Editar tarefa:", oldText);
        if (newText) {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks[index] = newText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        }
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") addTask();
    });

    loadTasks();
});
