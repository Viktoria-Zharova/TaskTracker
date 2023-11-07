document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const inputTask = document.getElementById("input-task");
    const enterTaskButton = document.getElementById("enter-task");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // загружаем таски
    if (tasks && tasks.length > 0) {
        tasks.forEach(function (taskText) {
            addTask(taskText);
        });
    }

    // добавление новой таски
    function addTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${taskText}</span>
            </label>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(taskItem);
        inputTask.value = "";

        // удаляем таски
        const deleteButton = taskItem.querySelector(".delete");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
            updateLocalStorage();
        });

        // выполненные таски
        const checkbox = taskItem.querySelector("input[type='checkbox']");
        const text = taskItem.querySelector("span");
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                text.style.textDecoration = "line-through";
            } else {
                text.style.textDecoration = "none";
            }
            updateLocalStorage();
        });
    }

    // ддобавление новой таски
    enterTaskButton.addEventListener("click", function () {
        const taskText = inputTask.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            tasks.push(taskText);
            updateLocalStorage();
        } else {
            let warning = "add your task, please";
            alert(warning);
        }
    });

    // апдейт локалсторедж
    function updateLocalStorage() {
        const taskTexts = Array.from(taskList.querySelectorAll("span")).map(span => span.textContent);
        localStorage.setItem("tasks", JSON.stringify(taskTexts));
    }
});
//чтобы почистить локалсторедж
//localStorage.removeItem("tasks");