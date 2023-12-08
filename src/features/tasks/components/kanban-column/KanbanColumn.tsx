import { Column } from '../../constants';
import { Task } from '../../types';
import { defineColumnStyleClass } from '../../utils/defineColumnStyleClass';
import KanbanTask from '../kanban-task/KanbanTask';

type KanbanColumnProps = {
    column: Column;
    tasks: Task[];
};

export default function KanbanColumn({ column, tasks }: KanbanColumnProps) {
    const columnStyleClass = defineColumnStyleClass(column);

    return (
        <div
            key={column}
            className={`kanban__column ${columnStyleClass}`}
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
                    />
                ))}
        </div>
    );
}
