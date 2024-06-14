// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const taskDateInput = document.getElementById('task-date');
    const taskTimeInput = document.getElementById('task-time');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskTitle = newTaskInput.value;
        const taskDate = taskDateInput.value;
        const taskTime = taskTimeInput.value;
        if (taskTitle && taskDate && taskTime) {
            const taskDateTime = new Date(`${taskDate}T${taskTime}`);
            addTask(taskTitle, taskDateTime);
            newTaskInput.value = '';
            taskDateInput.value = '';
            taskTimeInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeTask(e.target.parentElement);
        } else if (e.target.tagName === 'LI') {
            toggleTask(e.target);
        }
    });

    function addTask(task, dateTime) {
        const li = document.createElement('li');
        li.textContent = `${task} - ${dateTime.toLocaleString()}`;
        li.dataset.dateTime = dateTime;
        const button = document.createElement('button');
        button.textContent = 'Supprimer';
        li.appendChild(button);
        taskList.appendChild(li);
        scheduleNotification(task, dateTime);
    }

    function removeTask(taskElement) {
        taskList.removeChild(taskElement);
    }

    function toggleTask(taskElement) {
        taskElement.classList.toggle('completed');
    }

    function scheduleNotification(task, dateTime) {
        const now = new Date();
        const timeToNotification = dateTime - now;
        if (timeToNotification > 0) {
            setTimeout(() => {
                alert(`Alarme: ${task}`);
            }, timeToNotification);
        }
    }
});
