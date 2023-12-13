import PrimaryButton from '../../../../components/button/PrimaryButton';
import TextField from '../../../../components/input/TextField';
import SelectField from '../../../../components/select/SelectField';
import { priorityLevels } from '../../constants';
import { PropertyType, Task, TeamMember } from '../../types';
import { formatDate } from '../../utils/formatDate';

type EditableTaskContentProps = {
    teamMembers: TeamMember[];
    editedTask: Task;
    handleTaskPropertyChange: <T extends PropertyType>(property: T, value: Task[T]) => void;
    handleSetDueDate: (date: string) => void;
    closeTaskEdit: () => void;
};

export default function EditableTaskContent({
    teamMembers,
    editedTask,
    handleTaskPropertyChange,
    handleSetDueDate,
    closeTaskEdit,
}: EditableTaskContentProps) {
    return (
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
                    value={editedTask.dueDate}
                    onChange={(e) => {
                        handleSetDueDate(formatDate(new Date(e.target.value)));

                        if (e.target.value === '') {
                            handleSetDueDate(formatDate(new Date()));
                        }

                        handleTaskPropertyChange('dueDate', formatDate(new Date(e.target.value)));
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
                        ...teamMembers.map((teamMember) => ({
                            value: teamMember.id,
                            label: teamMember.name,
                        })),
                    ]}
                    onChange={(newValue) => {
                        const selectedTeamMember = teamMembers.find((member) => member.id === Number(newValue)) ?? null;
                        handleTaskPropertyChange('assignedTeamMember', selectedTeamMember);
                    }}
                />
            </div>

            <PrimaryButton onClick={closeTaskEdit}>Finish editing</PrimaryButton>
        </div>
    );
}
