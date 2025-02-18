
import { projectFactory } from "./projectSrc";
import { taskCreate } from "./taskSrc";

const addProjectToStorage = () => {
    function createProjectToStorage(name) {
        if (!name || typeof name !== 'string') {
            console.error("Invalid project name:", name);
            return;
        }
        const project = projectFactory(name);
        if (!project || !project.Name) {
            console.error("Failed to create project:", project);
            return;
        }
        storeInStorage(project.Name, project);
    }

    function storeInStorage(name, project) {
        if (!name || !project) {
            console.error("Invalid arguments for storing project in storage:", { name, project });
            return;
        }
        localStorage.setItem(name, JSON.stringify(project));
    }

    function deleteProjectFromStorage(name) {
        if (!name) {
            console.error("Project name is required to delete from storage.");
            return;
        }
        if (localStorage.getItem(name) === null) {
            console.warn(`No project found with name: ${name}`);
            return;
        }
        localStorage.removeItem(name);
    }

    return { createProjectToStorage, deleteProjectFromStorage };
};

// Task Part

const addTaskToStorage = () => {
    function getProject() {
        const selectedProject = document.querySelector('.selected');
        if (!selectedProject) {
            console.error("No selected project found in the DOM.");
            return null;
        }

        const selectedProjectNameElement = selectedProject.querySelector('p');
        if (!selectedProjectNameElement) {
            console.error("No <p> tag found in the selected project element.");
            return null;
        }

        const selectedProjectName = selectedProjectNameElement.innerHTML;
        const project = JSON.parse(localStorage.getItem(selectedProjectName));

        if (!project) {
            console.error(`No project found in localStorage with name: ${selectedProjectName}`);
            return null;
        }

        return project;
    }

    function createTaskInStorage(name, priority, date) {
        const project = getProject();
        if (!project) {
            console.error("Failed to create task: no project found.");
            return;
        }

        if (!name || typeof name !== 'string') {
            console.error("Invalid task name:", name);
            return;
        }

        const validPriorities = ["low", "medium", "high"];
        if (!validPriorities.includes(priority)) {
            console.error("Invalid priority:", priority);
            return;
        }

        if (isNaN(Date.parse(date))) {
            console.error("Invalid date provided:", date);
            return;
        }

        const newTask = taskCreate(name, priority, date);
        project.tasks.push(newTask);
        storeInStorageTask(project.Name, project);
    }

    function deleteTaskFromStorage(index) {
        let project = getProject();
        
        project.tasks.splice(Number(index), 1);
        storeInStorageTask(project.Name, project);
    }

    function storeInStorageTask(name, obj) {
        if (!name || !obj) {
            console.error("Invalid arguments for storing task in storage:", { name, obj });
            return;
        }
        localStorage.setItem(name, JSON.stringify(obj));
    }

    return { createTaskInStorage, deleteTaskFromStorage };
};

export { addProjectToStorage, addTaskToStorage };

