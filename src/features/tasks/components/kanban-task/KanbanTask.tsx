import { Task } from '../../types';

type KanbanTaskProps = {
    task: Task;
};

export default function KanbanTask({ task }: KanbanTaskProps) {
    return (
        <div>
            <h3>{task.name}</h3>
        </div>
    );
}
