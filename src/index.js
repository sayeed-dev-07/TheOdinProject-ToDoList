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
    deleteAllProjectFromView();
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

            projectView.deleteProjectFromStorage(name);
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
    const submitBtn = document.getElementById('submitBtn');



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




// Initialize functionality
renderProjects();
deleteProject();
inputProject();
getTaskInputInStorage();
addDataToTasks();
