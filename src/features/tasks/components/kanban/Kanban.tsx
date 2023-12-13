import { MutableRefObject } from 'react';
import { Column } from '../../constants';
import { Task, TeamMember } from '../../types';
import KanbanColumn from '../kanban-column/KanbanColumn';

export type KanbanProps = {
    taskBoardColumns: Column[];
    tasks: Task[];
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
    handleColumnDrop: (column: Column) => void;
    handleSetTasks: (tasks: Task[]) => void;
    handleSetSelectedDueDate: (date: Date) => void;
    users: TeamMember[];
};

export default function Kanban({
    taskBoardColumns,
    tasks,
    handleOnDragStart,
    draggedTask,
    handleColumnDrop,
    handleSetTasks,
    handleSetSelectedDueDate,
    users,
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
                    handleSetTasks={handleSetTasks}
                    handleSetSelectedDueDate={handleSetSelectedDueDate}
                    users={users}
                />
            ))}
        </div>
    );
}
