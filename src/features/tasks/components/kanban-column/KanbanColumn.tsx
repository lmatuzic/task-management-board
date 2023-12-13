import { MutableRefObject } from 'react';
import { Column } from '../../constants';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { Task } from '../../types';
import { defineColumnStyleClass } from '../../utils/defineColumnStyleClass';
import KanbanTask from '../kanban-task/KanbanTask';

type KanbanColumnProps = {
    column: Column;
    tasks: Task[];
    draggedTask: MutableRefObject<unknown>;
};

export default function KanbanColumn({ column, tasks, draggedTask }: KanbanColumnProps) {
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
                        task={task}
                        handleOnDragStart={handleOnDragStart}
                        draggedTask={draggedTask}
                    />
                ))}
        </div>
    );
}
