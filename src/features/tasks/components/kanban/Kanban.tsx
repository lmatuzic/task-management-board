import { MutableRefObject } from 'react';
import { Column } from '../../constants';
import { Task } from '../../types';
import KanbanColumn from '../kanban-column/KanbanColumn';

export type KanbanProps = {
    taskBoardColumns: Column[];
    tasks: Task[];
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
    handleColumnDrop: (column: Column) => void;
};

export default function Kanban({
    taskBoardColumns,
    tasks,
    handleOnDragStart,
    draggedTask,
    handleColumnDrop,
}: KanbanProps) {
    return (
        <div className='kanban'>
            {taskBoardColumns.map((column) => (
                <KanbanColumn
                    key={column}
                    column={column}
                    tasks={tasks}
                    handleOnDragStart={handleOnDragStart}
                    draggedTask={draggedTask}
                    handleColumnDrop={handleColumnDrop}
                />
            ))}
        </div>
    );
}
