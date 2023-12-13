import { MutableRefObject } from 'react';
import { Column } from '../../constants';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { Task, TeamMember } from '../../types';
import { defineColumnStyleClass } from '../../utils/defineColumnStyleClass';
import KanbanTask from '../kanban-task/KanbanTask';

type KanbanColumnProps = {
    column: Column;
    tasks: Task[];
    draggedTask: MutableRefObject<unknown>;
    handleSetTasks: (tasks: Task[]) => void;
    handleSetSelectedDueDate: (date: string) => void;
    users: TeamMember[];
};

export default function KanbanColumn({
    column,
    tasks,
    draggedTask,
    handleSetTasks,
    handleSetSelectedDueDate,
    users,
}: KanbanColumnProps) {
    const { handleOnDragStart, handleColumnDrop } = useDragAndDrop({ draggedTask });
    const columnStyleClass = defineColumnStyleClass(column);

    return (
        <div
            key={column}
            className={`kanban-column ${columnStyleClass}`}
            onDrop={() => handleColumnDrop(tasks, column)}
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
