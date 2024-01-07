document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector('#submitBtn');
  const taskItems = document.querySelector('.taskList');

  // Retrieve tasks from localStorage if available
  let taskListSaved = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to save tasks to localStorage
  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(taskListSaved));
  };

  // Load existing tasks from localStorage
  taskListSaved.forEach(taskText => {
    createTaskElement(taskText); // Create task elements for each saved task
  });

  submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const inputField = document.querySelector('#taskInput');
    const task = inputField.value.trim();  

    if (task !== '') {
      createTaskElement(task); // Create task element for the new task
      taskListSaved.push(task); // Add task to the saved list
      saveTasksToLocalStorage(); // Save updated tasks to localStorage
      inputField.value = ''; // Clear the input field after adding task
    } else {
      alert('Please enter a task.');
    }
  });

  // Function to create a task element and its associated functionalities
  function createTaskElement(taskText) {
    const newTask = document.createElement('li');
    const checkedBtn = document.createElement('input');
    checkedBtn.setAttribute( "type", "checkbox");
    checkedBtn.className = 'checkedBtn'
    taskItems.appendChild(checkedBtn)
    newTask.textContent = taskText;
    taskItems.appendChild(newTask);
    createCloseButton(newTask); // Create a close button for this task
    createEditFunctionality(newTask); // Create an edit functionality for this task
  }

  // Function to create a "close" button and append it to the given task
  function createCloseButton(taskElement) {
    const span = document.createElement("span");
    const bin = document.createElement("img");
    bin.src = "img/trashcan.png";
    bin.className = "bin";
    span.className = "close";
    span.appendChild(bin);
    taskElement.appendChild(span);

    // Click on a close button to hide the current list item
    span.addEventListener('click', function() {
      taskElement.remove();
      const taskText = taskElement.textContent;
      const index = taskListSaved.indexOf(taskText);
      if (index !== -1) {
        taskListSaved.splice(index, 1); // Remove the task from the saved list
        saveTasksToLocalStorage(); // Save updated tasks to localStorage
      }
    });
  }
   //Add a "checked" symbol when clicking on a list item
  checkedBtn.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'input') {
      ev.target.classList.toggle('checked');
    }
  });

// Function to create an edit functionality for the given task
function createEditFunctionality(taskElement) {
    taskElement.addEventListener('click', function() {
      const currentText = taskElement.textContent;
      const editInput = document.createElement('input');
      editInput.className = "editInput";
      editInput.value = currentText;
  
      // Replace the task text with an input field for editing
      taskElement.innerHTML = '';
      taskElement.appendChild(editInput);
      editInput.focus();
      
      // Save changes when the input field loses focus (on blur)
      editInput.addEventListener('blur', function() {
        const newText = editInput.value.trim();
        if (newText !== '') {
          taskElement.textContent = newText;
          const index = taskListSaved.indexOf(currentText);
          if (index !== -1) {
            taskListSaved[index] = newText; // Update task in the saved list
            saveTasksToLocalStorage(); // Save updated tasks to localStorage
          }
        } else {
          taskElement.textContent = currentText; // Revert to the original text
          alert('Task cannot be empty. Changes discarded.');
        }
      });
  
      // Capture Enter key press to save changes
      editInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          editInput.blur(); // Trigger the blur event to save changes
        }
      });
    });
  }


});

