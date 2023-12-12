import { MutableRefObject } from 'react';
import PrimaryButton from '../../../../components/button/primary-button/PrimaryButton';
import Dialog from '../../../../components/dialog/Dialog';
import useEditTask from '../../hooks/useEditTask';
import { Task, TeamMember } from '../../types';
import EditableTaskContent from '../editable-task-content/EditableTaskContent';

type KanbanTaskProps = {
    tasks: Task[];
    task: Task;
    handleOnDragStart: (task: Task) => void;
    draggedTask: MutableRefObject<unknown>;
    handleSetTasks: (tasks: Task[]) => void;
    handleSetSelectedDueDate: (date: Date) => void;
    users: TeamMember[];
};

export default function KanbanTask({
    tasks,
    task,
    handleOnDragStart,
    handleSetTasks,
    handleSetSelectedDueDate,
    users,
}: KanbanTaskProps) {
    const {
        openDialog,
        closeDialog,
        isDialogOpen,
        handleTaskPropertyChange,
        handleDeleteTask,
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
                        users={users}
                        editedTask={editedTask}
                        handleTaskPropertyChange={handleTaskPropertyChange}
                        handleSetSelectedDueDate={handleSetSelectedDueDate}
                        closeTaskEdit={closeTaskEdit}
                    />
                ) : (
                    <>
                        <h1>{task.name}</h1>
                        <div>Due date: {task.dueDate.toDateString()}</div>
                        <div>Priority Level: {task.priorityLevel}</div>
                        {task.assignedTeamMember ? (
                            <div>Assigned Team Member: {task.assignedTeamMember.name}</div>
                        ) : null}

                        <PrimaryButton onClick={startTaskEdit}>Edit</PrimaryButton>
                        <PrimaryButton onClick={handleDeleteTask}>Delete</PrimaryButton>
                    </>
                )}
            </Dialog>
        </>
    );
}
