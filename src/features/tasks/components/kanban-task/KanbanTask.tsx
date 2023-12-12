import { MutableRefObject } from 'react';
import PrimaryButton from '../../../../components/button/primary-button/PrimaryButton';
import Dialog from '../../../../components/dialog/Dialog';
import TextField from '../../../../components/input/TextField';
import SelectField from '../../../../components/select/SelectField';
import { priorityLevels } from '../../constants';
import { Task, TeamMember } from '../../types';
import useHandleTask from '../../hooks/useHandleTask';

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
    } = useHandleTask({
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
                {isEditing ? (
                    <div className='kanban-task-edit'>
                        <div className='kanban-task-edit__item'>
                            <TextField
                                label='Name'
                                inputId='task-name-edit'
                                value={editedTask.name}
                                onChange={(newValue) => handleTaskPropertyChange('name', newValue)}
                            />
                        </div>

                        <div className='kanban-task-edit__item'>
                            <label htmlFor='due-date-edit'>Due date</label>

                            <input
                                type='date'
                                id='due-date-edit'
                                value={editedTask.dueDate.toISOString().split('T')[0]}
                                onChange={(e) => {
                                    handleSetSelectedDueDate(new Date(e.target.value));

                                    if (e.target.value === '') {
                                        handleSetSelectedDueDate(new Date());
                                    }

                                    handleTaskPropertyChange('dueDate', new Date(e.target.value));
                                }}
                            />
                        </div>

                        <div className='kanban-task-edit__item'>
                            <SelectField
                                label='Priority Level'
                                value={editedTask.priorityLevel}
                                selectId='priority-edit-select'
                                onChange={(newValue) => handleTaskPropertyChange('priorityLevel', newValue as string)}
                                options={priorityLevels.map((priorityLevel) => ({
                                    value: priorityLevel,
                                    label: priorityLevel,
                                }))}
                            />
                        </div>

                        <div className='kanban-task-edit__item'>
                            <SelectField
                                label='Assigned Team Member'
                                value={editedTask.assignedTeamMember ? editedTask.assignedTeamMember.id : ''}
                                selectId='assigned-team-member-select-edit'
                                options={[
                                    { value: '', label: 'Select Team Member' },
                                    ...users.map((teamMember) => ({
                                        value: teamMember.id,
                                        label: teamMember.name,
                                    })),
                                ]}
                                onChange={(newValue) => {
                                    const selectedTeamMember =
                                        users.find((member) => member.id === Number(newValue)) ?? null;
                                    handleTaskPropertyChange('assignedTeamMember', selectedTeamMember);
                                }}
                            />
                        </div>

                        <PrimaryButton
                            onClick={closeTaskEdit}
                            content={<>FInish editing</>}
                        />
                    </div>
                ) : (
                    <>
                        <h1>{task.name}</h1>
                        <div>Due date: {task.dueDate.toDateString()}</div>
                        <div>Priority Level: {task.priorityLevel}</div>
                        {task.assignedTeamMember ? (
                            <div>Assigned Team Member: {task.assignedTeamMember.name}</div>
                        ) : null}

                        <PrimaryButton
                            onClick={startTaskEdit}
                            content={<>Edit</>}
                        />

                        <PrimaryButton
                            onClick={handleDeleteTask}
                            content={<>Delete</>}
                        />
                    </>
                )}
            </Dialog>
        </>
    );
}
