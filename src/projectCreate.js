const projectContainer = document.querySelector('.project-container');

const projectCreate = function(){
    function createProject(name, index){
        const div = document.createElement('div');
        div.classList.add('project');
        div.id = index;

        const p = document.createElement('p');
        p.innerHTML = `${name}`;
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash')

        div.appendChild(p);
        div.appendChild(icon);
        projectContainer.appendChild(div);
    }
    return{createProject};

}

export{projectCreate}