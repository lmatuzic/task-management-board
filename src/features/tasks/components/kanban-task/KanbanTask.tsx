import { MutableRefObject } from 'react';
import PrimaryButton from '../../../../components/button/PrimaryButton';
import WarningButton from '../../../../components/button/WarningButton';
import Dialog from '../../../../components/dialog/Dialog';
import useTaskContext from '../../context/useTaskContext';
import useEditTask from '../../hooks/useEditTask';
import { Task } from '../../types';
import EditableTaskContent from '../editable-task-content/EditableTaskContent';

type KanbanTaskProps = {
    task: Task;
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
};

export default function KanbanTask({ task, handleOnDragStart }: KanbanTaskProps) {
    const { handleDeleteTask, tasks, handleSetTasks, teamMembers, handleSetDueDate } = useTaskContext();

    const {
        openDialog,
        closeDialog,
        isDialogOpen,
        handleTaskPropertyChange,
        isEditing,
        editedTask,
        startTaskEdit,
        closeTaskEdit,
    } = useEditTask({
        tasks,
        task,
        handleSetTasks,
    });

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
                <h1>Edit task</h1>

                {isEditing ? (
                    <EditableTaskContent
                        teamMembers={teamMembers}
                        editedTask={editedTask}
                        handleTaskPropertyChange={handleTaskPropertyChange}
                        handleSetDueDate={handleSetDueDate}
                        closeTaskEdit={closeTaskEdit}
                    />
                ) : (
                    <div className='kanban-task__content'>
                        <h2>{task.name}</h2>

                        <div className='info'>
                            <strong>Due date:</strong> {task.dueDate}
                        </div>

                        <div className='info'>
                            <strong>Priority Level:</strong> {task.priorityLevel}
                        </div>

                        {task.assignedTeamMember ? (
                            <div>Assigned Team Member: {task.assignedTeamMember.name}</div>
                        ) : null}

                        <div className='kanban-task__actions'>
                            <PrimaryButton onClick={startTaskEdit}>Edit</PrimaryButton>

                            <WarningButton onClick={() => handleDeleteTask(editedTask, closeDialog)}>
                                Delete
                            </WarningButton>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    );
}
