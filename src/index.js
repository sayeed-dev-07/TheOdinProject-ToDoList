import style from './style.css'
import { addProjectToStorage, addTaskToStorage} from './localStorage';
import { taskAddToContainer } from './taskCreate';


// object initialising 
const taskStorage = addTaskToStorage()
const taskView = taskAddToContainer();
const projectView = addProjectToStorage();


// select element via dom

const projectContainer = document.querySelector('.project-container')





function selectProject() {
    let projects = document.querySelectorAll('.project');
    const projectTitle = document.querySelector('.project-title-name');  // Element to display the title

    projects.forEach(pro => {
        pro.addEventListener('click', () => {
            // Get the title of the clicked project
            let ptext = pro.querySelector('p');
            let title = ptext.innerText;

            // Set the title in the projectTitle container
            projectTitle.innerHTML = `/${title}`;
            renderTasks(title)
            // Remove the 'selected' class from all projects
            projects.forEach(project => {
                project.classList.remove('selected');
            });

            // Add the 'selected' class to the clicked project
            pro.classList.add('selected');
        });
    });
}

renderProjects()
selectProject()

function renderProjects() {
    deleteAllProjectFromView();
    let index = 0;
    Object.keys(localStorage).forEach((key) => {
        let projectName = key;
        const div = document.createElement('div');
        div.classList.add('project');
        div.id = index;

        const p = document.createElement('p');
        p.innerHTML = `${projectName}`;
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash')

        div.appendChild(p);
        div.appendChild(icon);
        projectContainer.appendChild(div);
        index++;
    });
}

function deleteAllProjectFromView(){
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = '';
}



function inputProject(){
    const addProjectBtn = document.querySelector('.project-add-btn');
    const projectNameInput = document.querySelector('#project-name-input');

    addProjectBtn.addEventListener('click',()=>{
        let value = projectNameInput.value;
        if (value.trim().length === 0 || localStorage.getItem(value) !== null) {
            alert('Project Name Cant be blank or Already exists')
            return;
        }
        let newValue = value.trim();
        projectView.createProjectToStorage(newValue);
        alert(`Successfully added ${newValue} to Project List`);
        projectNameInput.value = ''
        renderProjects()
        selectProject()
        
    })
}

function deleteProject(){
    

    projectContainer.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('fa-trash')) {
            let parent = event.target.parentElement;
            let name = parent.querySelector('p').innerText;

            projectView.deleteProjectFromStorage(name);
            renderProjects();
            selectProject();
        }
    });
}


deleteProject()
inputProject()


function addTaskToDom(){
    clearAlltaskFomDom()

}
function clearAlltaskFomDom(){
    const taskContainer = document.querySelector('.task-container')
    taskContainer.innerHTML = '';
}

function defaultProject(){
    let proName = 'Demo';
    projectView.createProjectToStorage(proName)
}
defaultProject()

function renderTasks(projectName){
    const buttonContainer = document.querySelector('.task-adder');
    buttonContainer.innerHTML = '';
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task'
    addTaskBtn.classList.add('add-task-btn');
    buttonContainer.appendChild(addTaskBtn);
    taskView.renderTasksToDom(projectName);

    
}

function renderUserTaskDetails(projectName){
    const allProject = document.querySelectorAll('.project')
}