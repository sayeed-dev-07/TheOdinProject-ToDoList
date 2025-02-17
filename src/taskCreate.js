const taskContainer = document.querySelector('.task-container')
const taskAddToContainer = ()=>{
    function createTask(inputname, inputpriority, inputdate, index){
        
        const task = document.createElement('div');
        task.id = index;
        const taskName = document.createElement('div');
        const priorityContainer = document.createElement('div');
        const date = document.createElement('div');
        const button1 = document.createElement('button')
        const button2 = document.createElement('button')
        const dateInput = document.createElement('input');

        date.classList.add('date')
        task.classList.add('task');
        taskName.classList.add('name');
        dateInput.type = 'date';
        dateInput.name = 'date';
        dateInput.id = 'date';
        button1.id = 'edit-btn-task';
        button2.id = 'delete-btn-task';
        button1.disabled = true;


        dateInput.value = inputdate;

        button1.innerText = 'Edit';
        button2.innerText = 'Delete';

        priorityContainer.classList.add('priority-container')
        taskName.innerText = `${inputname}`;
        date.appendChild(dateInput)

        priorityContainer.innerHTML = `
        <select name="priority" id="priority-select">
                            <option value="" disabled selected>priority</option>
                            <option value="low" >low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
        `
        const prioritySelect = priorityContainer.querySelector('#priority-select');
        prioritySelect.value = inputpriority;

        task.appendChild(taskName);
        task.appendChild(priorityContainer)
        task.appendChild(date);
        task.appendChild(button1);
        task.appendChild(button2);

        taskContainer.appendChild(task)
    }
    function deleteAlltasksView(){
        taskContainer.innerHTML = '';
    }
    function deleteSingleTask(index){
        let allTasks = document.querySelectorAll('.task');
        for (let i = 0; i < allTasks.length; i++) {
            let id = allTasks[i].id;

            if(id === index){
                taskContainer.removeChild(allTasks[i]);
                break;
            }
            
        }
    }
    function renderTasksToDom(projectName){
        deleteAlltasksView();
        let projectTask = JSON.parse(localStorage.getItem(projectName));
        let tasks = projectTask.tasks;
        for (let i = 0; i < tasks.length; i++) {
            let name = tasks[i].taskName;
            let priority = tasks[i].taskPriority;
            let date = tasks[i].taskDate;

            createTask(name, priority, date, i)
        }
        
    }
    return{renderTasksToDom, deleteSingleTask}
}

export{taskAddToContainer};