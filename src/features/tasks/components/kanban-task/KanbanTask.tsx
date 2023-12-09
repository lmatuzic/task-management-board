import { MutableRefObject } from 'react';
import { Task } from '../../types';

type KanbanTaskProps = {
    task: Task;
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
};

export default function KanbanTask({ task, handleOnDragStart }: KanbanTaskProps) {
    return (
        <div
            className='kanban__task'
            draggable
            onDragStart={() => handleOnDragStart(task)}
        >
            <h3>{task.name}</h3>
        </div>
    );
}
