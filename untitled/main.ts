document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list") as HTMLUListElement;
    const inputTask = document.getElementById("input-task") as HTMLInputElement;
    const enterTaskButton = document.getElementById("enter-task") as HTMLInputElement;
    const tasks: string[] = JSON.parse(localStorage.getItem("tasks")) || [];

    // загружаем таски
    if (tasks && tasks.length > 0) {
        tasks.forEach(function (taskText) {
            addTask(taskText);
        });
    }

    // добавление новой таски
    function addTask(taskText: string) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <label>
                <input type="checkbox">
                <span>${taskText}</span>
            </label>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(taskItem);

        // удаляем таски
        const deleteButton = taskItem.querySelector(".delete") as HTMLButtonElement;
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
            updateLocalStorage();
        });

        // выполненные таски
        const checkbox = taskItem.querySelector("input[type='checkbox']") as HTMLInputElement;
        const text = taskItem.querySelector("span") as HTMLSpanElement;
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                text.style.textDecoration = "line-through";
            } else {
                text.style.textDecoration = "none";
            }
            updateLocalStorage();
        });
    }

    // добавление новой таски
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
