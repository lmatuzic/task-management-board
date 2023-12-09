import { MutableRefObject } from 'react';
import { Column } from '../../constants';
import { Task } from '../../types';
import { defineColumnStyleClass } from '../../utils/defineColumnStyleClass';
import KanbanTask from '../kanban-task/KanbanTask';

type KanbanColumnProps = {
    column: Column;
    tasks: Task[];
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
    handleColumnDrop: (column: Column) => void;
};

export default function KanbanColumn({
    column,
    tasks,
    draggedTask,
    handleOnDragStart,
    handleColumnDrop,
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
                        task={task}
                        handleOnDragStart={handleOnDragStart}
                        draggedTask={draggedTask}
                    />
                ))}
        </div>
    );
}
