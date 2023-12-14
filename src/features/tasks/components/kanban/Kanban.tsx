import { useRef } from 'react';
import { taskBoardColumns } from '../../constants';
import { Task } from '../../types';
import KanbanColumn from '../kanban-column/KanbanColumn';

export type KanbanProps = {
    tasks: Task[];
};

export default function Kanban({ tasks }: KanbanProps) {
    const draggedTask = useRef<unknown>(null);

    return (
        <div className='kanban'>
            {taskBoardColumns.map((column) => (
                <KanbanColumn
                    key={column}
                    column={column}
                    tasks={tasks}
                    draggedTask={draggedTask}
                />
            ))}
        </div>
    );
}
