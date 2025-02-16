const projectContainer = document.querySelector('.project-container');

export default projectCreate = function(){
    function createProject(name){
        const div = document.createElement('div');
        div.classList.add('project');

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