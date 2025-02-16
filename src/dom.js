const body = document.querySelector('body');

export default domCreate = function(){
    function createHeader(){
        let header = document.createElement('header');
        let p = document.createElement('p');
        p.id = 'logo';
        p.innerText = 'ToDoList';
        header.appendChild(p);
        body.appendChild(header);
    }

    function createMainContainer(){
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('main-container')
        createLeftContainer(mainContainer)
        createRightContainer(mainContainer)
    }

    function createLeftContainer(main){
        const leftContainer = document.createElement('div');
        const input = document.createElement('input');
        const projectAddBtn = document.createElement('button');
        const projectTitle = document.createElement('p');
        const projectContainer = document.createElement('div');
        
        
        input.id = 'project-name-input'
        input.type = 'text';
        projectAddBtn.classList.add('project-add-btn')
        projectContainer.classList.add('project-container');
        projectTitle.classList.add('project-name-title');
        leftContainer.classList.add('left-container');

        projectAddBtn.innerText = 'Add Project';
        projectTitle.innerText = 'Project List';


        leftContainer.appendChild(input);
        leftContainer.appendChild(projectAddBtn);
        leftContainer.appendChild(projectTitle);
        leftContainer.appendChild(projectContainer)
        main.appendChild(leftContainer)
    }
    function createRightContainer(main){
        const rightContainer = document.createElement('div');
        const containerTitle = document.createElement('div');
        const taskContainer = document.createElement('div');
        const taskAdder = document.createElement('div');
        const taskAddInput = document.createElement('div');
        const taskEditInput = document.createElement('div');

        rightContainer.classList.add('right-container')
        containerTitle.classList.add('right-container-title')
        taskContainer.classList.add('task-container');


        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p2.classList.add('project-title-name')
        p2.innerText = 'Demo'

        p1.innerText = 'Tasks/'

        containerTitle.appendChild(p1);
        containerTitle.appendChild(p2);


        const taskAddBtn = document.createElement('button');
        taskAddBtn.innerText = 'Add Tasks';

        taskAdder.appendChild(taskAddBtn);

        taskAddInput.id = 'hidden';
        taskEditInput.id = 'hidden';

        taskAddInput.classList.add('same-div');
        taskEditInput.classList.add('same-div');

        taskAddInput.innerHTML = `
        <input placeholder="Task Name" type="text" id="task-add-input">
                <button class="task-input-add-btn">Add</button>
                <button class="task-input-cancel-btn">Cancel</button>
        
        `


        taskEditInput.innerHTML = `
        
        <input placeholder="Task Name" type="text" id="task-edit-input">
                <button class="task-input-edit-btn">Save</button>
                <button class="task-input-back-btn">Back</button>

        `

        rightContainer.appendChild(containerTitle);
        rightContainer.appendChild(taskContainer);
        rightContainer.appendChild(taskAdder);
        rightContainer.appendChild(taskAddInput);
        rightContainer.appendChild(taskEditInput);
        main.appendChild(rightContainer);

    }

    return {createHeader, createMainContainer}
}
