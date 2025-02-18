import style from './style.css';
import { addProjectToStorage, addTaskToStorage } from './localStorage';
import { taskAddToContainer } from './taskCreate';

// Object Initialization
const taskStorage = addTaskToStorage();
const taskView = taskAddToContainer();
const projectView = addProjectToStorage();

// DOM Selection
const projectContainer = document.querySelector('.project-container');

// Main Functionality

function selectProject() {
    const projects = document.querySelectorAll('.project');
    const projectTitle = document.querySelector('.project-title-name'); // Element to display the title

    projects.forEach(pro => {
        pro.addEventListener('click', () => {
            const ptext = pro.querySelector('p');
            const title = ptext.innerText;

            projectTitle.innerHTML = `/${title}`;

            // Remove the 'selected' class from all projects
            projects.forEach(project => {
                project.classList.remove('selected');
            });

            // Add the 'selected' class to the clicked project
            pro.classList.add('selected');
            renderTasks(title);
        });
    });
}

function renderProjects() {
    deleteAllProjectFromView();  // Clear existing project list
    let index = 0;

    Object.keys(localStorage).forEach(key => {
        const projectName = key;

        // Create project container
        const div = document.createElement('div');
        div.classList.add('project');
        div.id = index;

        const p = document.createElement('p');
        p.innerHTML = `${projectName}`;
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash');

        div.appendChild(p);
        div.appendChild(icon);
        projectContainer.appendChild(div);

        index++;
    });

    // Update event listeners for projects
    selectProject();
}


function deleteAllProjectFromView() {
    projectContainer.innerHTML = '';
}

function inputProject() {
    const addProjectBtn = document.querySelector('.project-add-btn');
    const projectNameInput = document.querySelector('#project-name-input');

    addProjectBtn.addEventListener('click', () => {
        const value = projectNameInput.value.trim();

        if (value.length === 0 || localStorage.getItem(value) !== null) {
            alert('Project Name cannot be blank or already exists.');
            return;
        }

        projectView.createProjectToStorage(value);
        alert(`Successfully added "${value}" to Project List.`);
        projectNameInput.value = '';
        renderProjects();
    });
}

function deleteProject() {
    projectContainer.addEventListener('click', event => {
        if (event.target && event.target.classList.contains('fa-trash')) {
            const parent = event.target.parentElement;
            const name = parent.querySelector('p').innerText;

            // Remove project from storage
            projectView.deleteProjectFromStorage(name);

            // Clear the tasks associated with the deleted project
            const projectTitle = document.querySelector('.project-title-name');
            if (projectTitle.innerText === `/${name}`) {
                // Clear task container and reset "Add Task" button
                const buttonContainer = document.querySelector('.task-adder');
                buttonContainer.innerHTML = '';  // Remove the "Add Task" button
                const taskContainer = document.querySelector('.task-container');
                taskContainer.innerHTML = '';  // Remove all tasks

                projectTitle.innerHTML = ''; // Clear the title of the project
                let p = document.createElement('p');
                p.classList.add('notice');
                p.innerText = 'no task available create or select a project to add or view tasks';
                taskContainer.appendChild(p);
            }

            // Re-render the project list to reflect the changes
            renderProjects();
        }
    });
}


function renderTasks(projectName) {
    const buttonContainer = document.querySelector('.task-adder');
    buttonContainer.innerHTML = '';

    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.classList.add('add-task-btn');
    buttonContainer.appendChild(addTaskBtn);

    taskView.renderTasksToDom(projectName);
    openForm(addTaskBtn);

    // Reattach delete task event listeners
    deleteTaskFromStoreAndDom(projectName);
}


function openForm(btn) {
    const form = document.querySelector('dialog');
    if (!form) {
        console.error("Form modal not found.");
        return;
    }

    btn.addEventListener('click', () => {
        form.showModal();
    });
}
const dialog = document.querySelector('dialog')
function getTaskInputInStorage() {
    const submitBtn = document.querySelector('#submitBtn');
    const cancelBtn = document.querySelector('#cancel-btn');
    const inputName = document.querySelector('#name-input');
    const inputPriority = document.querySelector('#priority');
    const inputDate = document.querySelector('#dateInput');

    if (!submitBtn || !cancelBtn || !inputName || !inputPriority || !inputDate) {
        console.error("One or more form elements are missing.");
        return;
    }

    submitBtn.addEventListener('click', event => {
        event.preventDefault();

        const nameValue = inputName.value.trim();
        const dateValue = inputDate.value;
        const priorityValue = inputPriority.value;


        if (!nameValue || !dateValue || !priorityValue) {
            alert('All fields are required.');
            return;
        }

        taskStorage.createTaskInStorage(nameValue, priorityValue, dateValue);

        const selectedProject = document.querySelector('.selected p');
        if (selectedProject) {
            const projectName = selectedProject.innerText;
            renderTasks(projectName);
        }
        

        inputName.value = '';
        inputDate.value = '';
        inputPriority.value = '';
        dialog.close();
    });

    cancelBtn.addEventListener('click', () => {
        const form = document.querySelector('dialog');
        if (form) {
            form.close();
        }
    });
}

function addDataToTasks() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const dataName = document.getElementById('name-input').value.trim();
        const dataPriority = document.getElementById('priority').value;
        const inputDate = document.getElementById('dateInput').value;

        
        taskStorage.createTaskInStorage(dataName, dataPriority, inputDate);

        const selectedProject = document.querySelector('.selected p');
        if (selectedProject) {
            const projectName = selectedProject.innerText;
            renderTasks(projectName);
        }
        
    });
}
function deleteTaskFromStoreAndDom(projectName) {
    // Create a new listener for the delete buttons
    let trashIconArray = Array.from(document.querySelectorAll(".delete-btn-task"));
    let userTaskDetailContainerArray = Array.from(document.querySelectorAll(".task"));

    for (let i = 0; i < userTaskDetailContainerArray.length; i++) {
        let trashIcon = trashIconArray[i];

        trashIcon.removeEventListener("click", deleteTaskHandler);  // Remove old listener to avoid duplicates
        trashIcon.addEventListener("click", deleteTaskHandler);  // Re-add the listener after re-rendering
    }

    function deleteTaskHandler() {
        let index = this.parentElement.id;
        taskView.deleteSingleTask(index);
        taskStorage.deleteTaskFromStorage(index);
        taskView.renderTasksToDom(projectName);  // Re-render tasks after deletion
        deleteTaskFromStoreAndDom(projectName);  // Reattach delete event listeners
    }
}



// Initialize functionality
renderProjects();
deleteProject();
inputProject();
getTaskInputInStorage();
addDataToTasks();

