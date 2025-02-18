
const taskContainer = document.querySelector('.task-container');

const taskAddToContainer = () => {
    function createTask(inputname, inputpriority, inputdate, index) {
        // Ensure unique IDs for tasks and avoid conflicts
        const task = document.createElement('div');
        task.id = `${index}`; // Changed task ID to include a unique prefix
        const taskName = document.createElement('div');
        const priorityContainer = document.createElement('div');
        const date = document.createElement('div');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');
        const dateInput = document.createElement('input');


        // color change

        if(inputpriority === 'low'){
            task.classList.add('priority-low')
        }else if(inputpriority === 'medium'){
            task.classList.add('priority-medium')
        }else if(inputpriority === 'high'){
            task.classList.add('priority-high')
        }


        // Add classes and attributes
        date.classList.add('date');
        task.classList.add('task');
        taskName.classList.add('name');
        dateInput.type = 'date';
        dateInput.name = 'date';
        dateInput.classList.add('date-input');
        button1.classList.add('edit-btn-task');
        button2.classList.add('delete-btn-task');
        button1.disabled = true;

        // Validate and set date value
        if (!isNaN(Date.parse(inputdate))) {
            dateInput.value = inputdate;
        } else {
            console.error("Invalid date provided:", inputdate);
        }

        // Set button text
        button1.innerText = 'Edit';
        button2.innerText = 'Delete';

        // Create priority dropdown with a unique class
        priorityContainer.classList.add('priority-container');
        priorityContainer.innerHTML = `
        <select name="priority" class="priority-select">
            <option value="" disabled>priority</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
        </select>
        `;

        const prioritySelect = priorityContainer.querySelector('.priority-select');

        // Validate and set priority
        const validPriorities = ["low", "medium", "high"];
        if (validPriorities.includes(inputpriority)) {
            prioritySelect.value = inputpriority;
        } else {
            console.warn("Invalid priority:", inputpriority);
        }

        // Add task elements to the DOM structure
        taskName.innerText = `${inputname}`;
        date.appendChild(dateInput);
        task.appendChild(taskName);
        task.appendChild(priorityContainer);
        task.appendChild(date);
        task.appendChild(button1);
        task.appendChild(button2);
        taskContainer.appendChild(task);
    }

    function deleteSingleTask(index) {
        const taskContainer = document.querySelector('.task-container');
        const tasks = document.querySelectorAll('task');
        for (let i = 0; i < tasks.length; i++) {
            let id = tasks[i].id;
            if(id === index){
                taskContainer.removeChild(tasks[id]);
            }
            
        }
    }

    function renderTasksToDom(projectName) {
        deleteAlltasksView();

        const projectTask = JSON.parse(localStorage.getItem(projectName));

        // Check if projectTask and tasks exist
        if (!projectTask || !projectTask.tasks || projectTask.tasks.length === 0) {
            createEmptyNotice();
            return;
        }

        // Render all tasks for the given project
        const tasks = projectTask.tasks;
        for (let i = 0; i < tasks.length; i++) {
            const name = tasks[i].taskName;
            const priority = tasks[i].taskPriority;
            const date = tasks[i].taskDate;
            createTask(name, priority, date, i);
        }
    }

    function createEmptyNotice() {
        // Ensure no duplicate empty notices
        deleteAlltasksView();

        const notice = document.createElement('p');
        notice.innerHTML = 'No Task Available';
        notice.classList.add('notice');
        taskContainer.appendChild(notice);
    }

    function deleteAlltasksView() {
        // Clear all tasks and notices
        while (taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }
    }

    return { renderTasksToDom, deleteSingleTask, deleteAlltasksView };
};

export { taskAddToContainer };
