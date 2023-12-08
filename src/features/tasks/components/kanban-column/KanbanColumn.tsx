import { Column } from '../../constants';
import { Task } from '../../types';
import KanbanTask from '../kanban-task/KanbanTask';

type KanbanColumnProps = {
    column: Column;
    tasks: Task[];
};

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
    return (
        <div key={column}>
            <h2>{column}</h2>

            <div>
                {tasks
                    .filter((task) => task.column === column)
                    .map((task) => (
                        <KanbanTask
                            key={task.id}
                            task={task}
                        />
                    ))}
            </div>
        </div>
    );
}
