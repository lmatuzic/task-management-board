import { ChangeEvent, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Column, PriorityLevel, sampleTasks, taskBoardColumns } from '../../constants';
import { Task } from '../../types';
import Kanban from '../kanban/Kanban';
import TodosHeader from '../tasks-header/TasksHeader';

export default function TaskManagementBoard() {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<Task[]>(sampleTasks);

    const draggedTask = useRef<unknown>(null);

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
        };

        if (taskPayload.name.length < 1) {
            return;
        }

        setTasks([...tasks, taskPayload]);
    };

    const handleOnDragStart = (task: Task) => {
        draggedTask.current = task.id; // assigning currently dragged task ref to the one we're dragging
    };

    const handleColumnDrop = (column: Column) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === draggedTask.current ? { ...task, column } : task)),
        );
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
                handleOnDragStart={handleOnDragStart}
                draggedTask={draggedTask}
                handleColumnDrop={handleColumnDrop}
            />
        </div>
    );
}
