import { MutableRefObject } from 'react';
import { taskBoardColumns } from '../../constants';
import { Task, TeamMember } from '../../types';
import KanbanColumn from '../kanban-column/KanbanColumn';

export type KanbanProps = {
    tasks: Task[];
    draggedTask: MutableRefObject<unknown>;
    handleSetTasks: (tasks: Task[]) => void;
    handleSetSelectedDueDate: (date: string) => void;
    users: TeamMember[];
};

export default function Kanban({ tasks, draggedTask, handleSetTasks, handleSetSelectedDueDate, users }: KanbanProps) {
    return (
        <div className='kanban'>
            {taskBoardColumns.map((column) => (
                <KanbanColumn
                    key={column}
                    column={column}
                    tasks={tasks}
                    draggedTask={draggedTask}
                    handleSetTasks={handleSetTasks}
                    handleSetSelectedDueDate={handleSetSelectedDueDate}
                    users={users}
                />
            ))}
        </div>
    );
}
