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

  console.log(localStorage.getItem('tasks'))

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
      alert('Oops you forgot to enter a task.');
    }
  });


  function createTaskElement(taskText) {
    const newTask = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('id','checkbox')
    const labelCheckbox = document.createElement('label')
    labelCheckbox.setAttribute('for','checkbox')
    labelCheckbox.setAttribute('id', 'labelCheckbox')
    labelCheckbox.textContent = "donedone";
    const editTaskBtn = document.createElement('button');
    editTaskBtn.className = "editTaskBtn";
    editTaskBtn.innerText = "edit";
    newTask.className = "newTask";
    checkBox.type = "checkbox";
    checkBox.className = "checkBox";
    newTask.textContent = taskText;
    newTask.appendChild(checkBox);
    newTask.appendChild(labelCheckbox)
    newTask.appendChild(editTaskBtn);
    taskItems.appendChild(newTask);
    deleteBtn(newTask);
    editTask(newTask, taskText);
    markDone(checkBox, newTask);
    editTaskBtn.addEventListener('click', () => {
      markDone(checkBox, newTask);
    });
  }
  function markDone(checkBox, taskElement) {
    checkBox.addEventListener('change', () => {
      if (checkBox.checked) {
        taskElement.classList.add("strike");
      } else {
        taskElement.classList.remove("strike");
      }
    });
  }
  
  function deleteBtn(taskElement) {
    const span = document.createElement("span");
    const bin = document.createElement("img");
    bin.src = "img/icons/trashcan.png";
    bin.className = "bin";
    span.className = "deleteTask";
    span.appendChild(bin);
    taskElement.appendChild(span);

    span.addEventListener('click', function() {
      taskElement.remove();
      const taskText = taskElement.textContent;
      const index = taskListSaved.indexOf(taskText)
      const taskDone = [];
      if (index !== -1) {
        taskDone.push(taskListSaved.splice(index, 1))
        taskListSaved.splice(index, 1);
        saveTasksToLocalStorage();clear
      }
    });
  }

  

  function editTask(taskElement, taskText) {
    const currentText = taskText;
    const editInput = document.createElement('input');
    const addEditBtn = document.createElement('button');
    const editForm = document.createElement('div')
    const editTaskBtn = document.createElement('button');
    editTaskBtn.className = "editTaskBtn";
    editTaskBtn.innerText = "edit";
    taskElement.appendChild(editTaskBtn); 
    deleteBtn(taskElement);
    addEditBtn.classList.add("hide");

    editTaskBtn.addEventListener('click', function() {
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
            createTaskElement(newText)
            document.querySelector('li').remove()        
          }
        } else {
          taskElement.textContent = currentText;
          alert('Please edit.');
        }  
      });
      
      
    });
  
      localStorage.clear();
  };

}); 
