import { MutableRefObject } from 'react';
import { Column } from '../../constants';
import { Task, TeamMember } from '../../types';
import { defineColumnStyleClass } from '../../utils/defineColumnStyleClass';
import KanbanTask from '../kanban-task/KanbanTask';

type KanbanColumnProps = {
    column: Column;
    tasks: Task[];
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
    handleColumnDrop: (column: Column) => void;
    handleSetTasks: (tasks: Task[]) => void;
    handleSetSelectedDueDate: (date: Date) => void;
    users: TeamMember[];
};

export default function KanbanColumn({
    column,
    tasks,
    draggedTask,
    handleOnDragStart,
    handleColumnDrop,
    handleSetTasks,
    handleSetSelectedDueDate,
    users,
}: KanbanColumnProps) {
    const columnStyleClass = defineColumnStyleClass(column);

    return (
        <div
            key={column}
            className={`kanban-column ${columnStyleClass}`}
            onDrop={() => handleColumnDrop(column)}
            onDragOver={(e) => e.preventDefault()}
        >
            <header>
                <h2>{column}</h2>
            </header>

            {tasks
                .filter((task) => task.column === column)
                .map((task) => (
                    <KanbanTask
                        key={task.id}
                        tasks={tasks}
                        task={task}
                        handleOnDragStart={handleOnDragStart}
                        draggedTask={draggedTask}
                        handleSetTasks={handleSetTasks}
                        handleSetSelectedDueDate={handleSetSelectedDueDate}
                        users={users}
                    />
                ))}
        </div>
    );
}
