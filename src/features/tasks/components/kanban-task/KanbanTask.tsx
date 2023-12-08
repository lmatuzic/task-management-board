import { Task } from '../../types';

type KanbanTaskProps = {
    task: Task;
};

export default function KanbanTask({ task }: KanbanTaskProps) {
    return (
        <div className='kanban__task'>
            <h3>{task.name}</h3>
        </div>
    );
}
