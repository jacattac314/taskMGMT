import React from 'react';

const TaskList = () => {
    const tasks = [{ id: 1, task: "Dummy Task" }];
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>{task.task}</li>
            ))}
        </ul>
    );
};

export default TaskList;