import PrimaryButton from '../../../../components/button/PrimaryButton';
import WarningButton from '../../../../components/button/WarningButton';
import Dialog from '../../../../components/dialog/Dialog';
import { PropertyType, Task, TeamMember } from '../../types';
import EditableTask from '../editable-task/EditableTask';

type EditTaskDialogProps = {
    isDialogOpen: boolean;
    isEditing: boolean;
    task: Task;
    editedTask: Task;
    teamMembers: TeamMember[];
    handleDeleteTask: (editedTask: Task, closeEditDialog: () => void) => void;
    startTaskEdit: () => void;
    closeDialog: () => void;
    closeTaskEdit: () => void;
    handleTaskPropertyChange: <T extends PropertyType>(property: T, value: Task[T]) => void;
    handleSetDueDate: (dueDate: string) => void;
};

export default function EditTaskDialog({
    isDialogOpen,
    isEditing,
    task,
    editedTask,
    teamMembers,
    handleDeleteTask,
    startTaskEdit,
    closeDialog,
    handleTaskPropertyChange,
    handleSetDueDate,
    closeTaskEdit,
}: EditTaskDialogProps) {
    return (
        <Dialog
            isOpen={isDialogOpen}
            closeDialog={closeDialog}
            className='kanban-task-dialog'
        >
            <h1>Edit task</h1>

            {isEditing ? (
                <EditableTask
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
                        <strong>Due date:</strong>
                        <span>{task.dueDate}</span>
                    </div>

                    <div className='info'>
                        <strong>Priority Level:</strong>
                        <span>{task.priorityLevel}</span>
                    </div>

                    <div className='info'>
                        {task.assignedTeamMember ? (
                            <>
                                <strong>Assigned Team Member: </strong>
                                <span>{task.assignedTeamMember.name}</span>
                            </>
                        ) : null}
                    </div>

                    <div className='kanban-task__actions'>
                        <PrimaryButton onClick={startTaskEdit}>Edit</PrimaryButton>
                        <WarningButton onClick={() => handleDeleteTask(editedTask, closeDialog)}>Delete</WarningButton>
                    </div>
                </div>
            )}
        </Dialog>
    );
}
