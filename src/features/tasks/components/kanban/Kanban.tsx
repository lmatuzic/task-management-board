import { MutableRefObject } from 'react';
import { taskBoardColumns } from '../../constants';
import { Task } from '../../types';
import KanbanColumn from '../kanban-column/KanbanColumn';

export type KanbanProps = {
    tasks: Task[];
    draggedTask: MutableRefObject<unknown>;
};

export default function Kanban({ tasks, draggedTask }: KanbanProps) {
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
