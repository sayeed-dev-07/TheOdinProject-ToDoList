import style from './style.css'
import { addProjectToStorage, addTaskToStorage } from './localStorage';
import { taskAddToContainer } from './taskCreate';


// object initialising 
const taskView = taskAddToContainer();


// select element via dom

const projectContainer = document.querySelector('.project-container')





function selectProject(){
    let projects = document.querySelectorAll('.project');
    

    projects.forEach(pro=>{
        pro.addEventListener('click',()=>{
            projects.forEach(project=>{
                project.classList.remove('selected')
            })
            pro.classList.add('selected')
        })
    })
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

function renderTasks(pname){
    taskView.renderTasksToDom(pname)
}

renderTasks('tyson')
