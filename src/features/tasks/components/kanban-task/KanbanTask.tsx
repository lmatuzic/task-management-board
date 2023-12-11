import { MutableRefObject, useState } from 'react';
import { Task } from '../../types';
import Dialog from '../../../../components/dialog/Dialog';

type KanbanTaskProps = {
    task: Task;
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
};

export default function KanbanTask({ task, handleOnDragStart }: KanbanTaskProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <div
                className='kanban-task'
                draggable
                onDragStart={() => handleOnDragStart(task)}
                onClick={openDialog}
                tabIndex={0}
            >
                <h3>{task.name}</h3>
            </div>

            <Dialog
                isOpen={isDialogOpen}
                closeDialog={closeDialog}
                className='kanban-task__dialog'
            >
                <h1>{task.name}</h1>
                {task.assignedTeamMember ? <div>Assigned Team Member: {task.assignedTeamMember.name}</div> : null}
                <div>Due date: {task.dueDate.toDateString()}</div>
                <div>Priority Level: {task.priorityLevel}</div>
            </Dialog>
        </>
    );
}
