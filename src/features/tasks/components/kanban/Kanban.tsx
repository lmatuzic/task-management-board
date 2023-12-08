import { Column } from '../../constants';
import { Task } from '../../types';
import KanbanColumn from '../kanban-column/KanbanColumn';

export type KanbanProps = {
    taskBoardColumns: Column[];
    tasks: Task[];
};

export default function Kanban({ taskBoardColumns, tasks }: KanbanProps) {
    return (
        <div className='kanban'>
            {taskBoardColumns.map((column) => (
                <KanbanColumn
                    key={column}
                    column={column}
                    tasks={tasks}
                />
            ))}
        </div>
    );
}
