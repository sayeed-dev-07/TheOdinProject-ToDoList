import style from './style.css'
import { domCreate } from './dom';
import { projectFactory } from "./projectSrc";
import { taskAddToContainer } from './taskCreate';
import { addProjectToStorage } from './localStorage';
import { addTaskToStorage } from './localStorage';
import { projectCreate } from './projectCreate';


let addProjectToStorage1 = addProjectToStorage()
let projectCreate1 = projectCreate()
let dom1 = domCreate();
dom1.renderDom()
// createDefaultProject();
renderProjects();

function selectProject(){
    let projects = document.querySelectorAll('.project');
    projects.forEach(project=>{
        if(project.classList.contains('selected')){
            project.classList.remove('selected');
        }
    })

    projects.forEach(pro=>{
        pro.addEventListener('click',()=>{
            pro.classList.add('selected');
        })
    })
}
selectProject()

function createDefaultProject() {
    // This function creates a default project to get the user started

    const defaultProjectTask1 = {
        taskName: "Default task 1",
        taskPriority: "high",
        taskDate: "2020-06-29"
    }

    const defaultProjectTask2 = {
        taskName: "Default task 2",
        taskPriority: "high",
        taskDate:"2020-06-29"
    }

    const defaultProject = {
        Name: "Default Project",
        tasks: [defaultProjectTask1, defaultProjectTask2]
    }
    

}
addProjectToStorage1.createProjectToStorage('sayeed')


function renderProjects(){
    deleteAllProjectFromView();
    let index = 0;
    for (const key in localStorage) {
        let projectName = key;
        projectCreate1.createProject(projectName, index)
        index++;
    }

}

function deleteAllProjectFromView(){
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = '';
}

