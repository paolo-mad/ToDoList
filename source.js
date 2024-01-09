document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector('#submitBtn');
  const taskItems = document.querySelector('.taskList');

  let taskListSaved = JSON.parse(localStorage.getItem('tasks')) || [];

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(taskListSaved));
  };

  taskListSaved.forEach(taskText => {
    createTaskElement(taskText);
  });

  submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const inputField = document.querySelector('#taskInput');
    const task = inputField.value.trim();  

    if (task !== '') {
      createTaskElement(task);
      taskListSaved.push(task);
      saveTasksToLocalStorage();
      inputField.value = '';
    } else {
      alert('You forgot to enter a task.');
    }
  });

  function createTaskElement(taskText) {
    const newTask = document.createElement('li');
    const checkBox = document.createElement("input");
    newTask.className = "newTask" 
    checkBox.type = "checkbox";
    checkBox.className = "checkBox"
    newTask.textContent = taskText;
    taskItems.appendChild(newTask);
    newTask.appendChild(checkBox)
    createCloseButton(newTask);
    createEditFunctionality(newTask, taskText);
  }

  function createCloseButton(taskElement) {
    const span = document.createElement("span");
    const bin = document.createElement("img");
    bin.src = "img/trashcan.png";
    bin.className = "bin";
    span.className = "close";
    span.appendChild(bin);
    taskElement.appendChild(span);

    span.addEventListener('click', function() {
      taskElement.remove();
      const taskText = taskElement.textContent;
      const index = taskListSaved.indexOf(taskText);
      if (index !== -1) {
        taskListSaved.splice(index, 1);
        saveTasksToLocalStorage();
      }
    });
  }

  function createEditFunctionality(taskElement) {
    taskElement.addEventListener('clik', function() {
      const currentText = taskElement.textContent;
      const editInput = document.createElement('input');
      const addEditBtn = document.createElement('button');
      const editForm = document.createElement('div')
      editForm.appendChild(editInput);
      editForm.appendChild(addEditBtn);

      editForm.className = "editForm"
      addEditBtn.innerHTML = "add";
      addEditBtn.className = "addEditBtn";

      editInput.style.display = "block";
      
      
      editInput.className = "editInput";
      editInput.value = currentText;
  
      taskElement.innerHTML = '';
      taskElement.appendChild(editForm);
      editInput.focus()


      addEditBtn.addEventListener('click', function() {
        const newText = editInput.value.trim();
        if (newText !== '') {
          taskElement.textContent = newText;
          const index = taskListSaved.indexOf(currentText);
          if (index !== -1) {
            taskListSaved[index] = newText;
            
            saveTasksToLocalStorage();        


          }
        } else {
          taskElement.textContent = currentText;
          alert('Please edit.');
        }
        createCloseButton(taskElement)
        addEditBtn.classList.add("hide");

      });

      // Add a "checked" symbol when clicking on a list item
      const list = document.querySelector('.allTaskList');
      list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'li') {
          ev.target.classList.toggle('checked');
        }
      }, false);
      
  
      console.log("works")
    });
  }
});
