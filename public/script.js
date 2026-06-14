// Load tasks when the page opens
window.onload = loadTasks;

// Function to load all tasks
async function loadTasks() {

    const response = await fetch('/tasks');
    const tasks = await response.json();

    displayTasks(tasks);
}

// Function to display tasks
function displayTasks(tasks) {

    const taskList = document.getElementById('taskList');

    taskList.innerHTML = '';

    tasks.forEach(task => {

        const li = document.createElement('li');

        li.innerHTML = `
            <span>
                ${task.name}
                (${task.created_at || 'No Date'})
            </span>

            <div>
                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Filter tasks by date range
async function filterTasks() {

    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;

    if (!start || !end) {
        alert('Please select both dates.');
        return;
    }

    const response = await fetch(
        `/tasks/filter?start=${start}&end=${end}`
    );

    const tasks = await response.json();

    displayTasks(tasks);
}

// Function to add a task
async function addTask() {

    const input = document.getElementById('taskInput');

    const taskText = input.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    await fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: taskText
        })
    });

    input.value = '';

    loadTasks();
}

// Function to edit a task
async function editTask(id) {

    const newTask = prompt(
        'Enter the new task name:'
    );

    if (!newTask || newTask.trim() === '') {
        return;
    }

    await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newTask.trim()
        })
    });

    loadTasks();
}

// Function to delete a task
async function deleteTask(id) {

    const confirmDelete = confirm(
        'Are you sure you want to delete this task?'
    );

    if (!confirmDelete) {
        return;
    }

    await fetch(`/tasks/${id}`, {
        method: 'DELETE'
    });

    loadTasks();
}