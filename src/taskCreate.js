export default taskFactory = function(){
    function createTask(inputname, inputpriority, inputdate){
        const task = document.createElement('div');
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
        button1.id = 'delete-btn-task';
        button1.disabled = true;

        date.value = inputdate;

        button1.innerText = 'Edit';
        button2.innerText = 'Delete';

        priorityContainer.classList.add('priority-container')
        taskName.innerText = `${inputname}`;
        date.appendChild(dateInput)

        priorityContainer.innerHTML = `
        <select name="priority" id="priority-select">
                            <option value="" disabled selected>priority</option>
                            <option value="green" >low</option>
                            <option value="yellow">medium</option>
                            <option value="red">high</option>
                        </select>
        `
        const prioritySelect = document.querySelector('#priority-select');
        prioritySelect.value = inputpriority;

        task.appendChild(taskName);
        task.appendChild(priorityContainer)
        task.appendChild(date);
        task.appendChild(button1);
        task.appendChild(button2);
    }
    
}