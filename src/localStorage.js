// project part

import { projectFactory } from "./projectSrc";
import { taskCreate } from "./taskSrc";

const addProjectToStorage = ()=>{
    function createProjectToStorage(name){
        let project = projectFactory(name);
        storeInStorage(project.Name, project);
    }

    function storeInStorage(name, tasks){
        window.localStorage.setItem(name, JSON.stringify(tasks));
    }

    function deleteProjectFromStorage(name){
        window.localStorage.removeItem(name)
    }

    return{createProjectToStorage, deleteProjectFromStorage};
}


// task part

const addTaskToStorage = ()=>{
    function getProject(){
        let selectedProject = document.querySelector('.selected');
        let selectedProjectName = selectedProject.innerText;
        let project = JSON.parse(localStorage.getItem(selectedProjectName))
        return project;
    }
    function createTaskInStorage(name, priority, date){
        let project = getProject();
        let newTask = taskCreate(name, priority, date);
        project.tasks.push(newTask);
    }

    function deleteTaskFromStorage(index){
        let project = getProject();
        project.tasks.splice(Number(index), 1);
        storeInStorageTask(project.Name, project)
    }
    function storeInStorageTask(name, obj){
        localStorage.setItem(name, JSON.stringify(obj))
    }
    return {createTaskInStorage, deleteTaskFromStorage}
}

export{addProjectToStorage, addTaskToStorage}