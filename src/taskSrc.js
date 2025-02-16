const taskCreate = function(name, priority, date){
    let taskName = name;
    let taskPriority = priority;
    let taskDate = date;

    return {taskName, taskPriority, taskDate}
}
export{taskCreate}