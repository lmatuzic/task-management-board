import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Column, PriorityLevel, sampleTasks, taskBoardColumns } from '../../constants';
import { Task } from '../../types';
import TodosHeader from '../tasks-header/TasksHeader';
import Kanban from '../kanban/Kanban';

export default function TaskManagementBoard() {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<Task[]>(sampleTasks);

    const handleSetTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    };

    const handleAddTask = () => {
        const taskPayload: Task = {
            id: uuidv4(),
            name: taskName,
            column: Column.TO_DO,
            dueDate: new Date(),
            assignedTeamMember: 'New User',
            priorityLevel: PriorityLevel.HIGH,
            sortIndex: tasks[tasks.length + 1]?.sortIndex || tasks.length + 1,
        };

        setTasks([...tasks, taskPayload]);
    };

    return (
        <div className='task-management-board'>
            <TodosHeader
                taskName={taskName}
                handleSetTaskName={handleSetTaskName}
                handleAddTask={handleAddTask}
            />

            <Kanban
                taskBoardColumns={taskBoardColumns}
                tasks={tasks}
            />
        </div>
    );
}
