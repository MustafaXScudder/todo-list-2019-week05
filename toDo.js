//making a lot of commnets to review later
// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskCounter = document.getElementById('taskCounter');

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create a new list item
    const li = document.createElement('li');

    // Add a checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
      saveTasks(); // Save state to local storage
      updateTaskCounter(); // Update the task counter
    });

    // Add the task text
    const taskTextNode = document.createTextNode(taskText);

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.classList.add('fade-out'); // Add fade-out animation
      setTimeout(() => {
        taskList.removeChild(li); // Remove the task after animation
        saveTasks(); // Update local storage
        updateTaskCounter(); // Update the task counter
      }, 300); // Match the duration of the CSS transition
    });

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskTextNode);
    li.appendChild(deleteBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';

    // Save tasks to local storage and update the counter
    saveTasks();
    updateTaskCounter();
  } else {
    alert('Please enter a task!');
  }
}

// Function to save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(task => {
    tasks.push({
      text: task.childNodes[1].textContent.trim(), // Task text
      completed: task.classList.contains('completed') // Completion status
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');

    // Add checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
      saveTasks();
      updateTaskCounter();
    });

    // Add task text
    const taskTextNode = document.createTextNode(task.text);

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      li.classList.add('fade-out');
      setTimeout(() => {
        taskList.removeChild(li);
        saveTasks();
        updateTaskCounter();
      }, 300);
    });

    // Append elements to the list item
    li.appendChild(checkbox);
    li.appendChild(taskTextNode);
    li.appendChild(deleteBtn);

    // Add completed class if the task was completed
    if (task.completed) {
      li.classList.add('completed');
    }

    // Append the list item to the task list
    taskList.appendChild(li);
  });

  // Update the task counter
  updateTaskCounter();
}

// Function to update the task counter
function updateTaskCounter() {
  const totalTasks = document.querySelectorAll('#taskList li').length;
  const completedTasks = document.querySelectorAll('#taskList .completed').length;
  const remainingTasks = totalTasks - completedTasks;
  taskCounter.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
}

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Event listener for pressing "Enter" in the input field
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Event listener for the "Clear All" button
clearAllBtn.addEventListener('click', () => {
  taskList.innerHTML = ''; // Clear all tasks
  localStorage.removeItem('tasks'); // Clear local storage
  updateTaskCounter(); // Update the task counter
});

// Load tasks from local storage when the page loads
window.addEventListener('load', loadTasks);