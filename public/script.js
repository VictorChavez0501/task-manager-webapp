// Function to add a new task
function addTask() {

    const input = document.getElementById('taskInput');

    const taskText = input.value;

    if (taskText === '') return;

    const li = document.createElement('li');

    li.innerHTML = `
        ${taskText}
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    document.getElementById('taskList').appendChild(li);

    input.value = '';
}

// Function to delete a task
function deleteTask(button) {
    button.parentElement.remove();
}

// Function to edit a task
function editTask(button) {

    const li = button.parentElement;

    const newTask = prompt('Edit task:', li.firstChild.textContent);

    if (newTask !== null) {
        li.firstChild.textContent = newTask;
    }
}