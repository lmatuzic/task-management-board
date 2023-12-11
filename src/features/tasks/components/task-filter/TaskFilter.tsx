import { PriorityLevel, priorityLevels } from '../../constants';
import { User } from '../../types';

type TaskfilterProps = {
    users: User[];
    handleSetSelectedTeamMember: (targetMemberId: number) => void;
    selectedTeamMember: User | null;
    handleSetSelectedPriority: (priorityLevel: PriorityLevel) => void;
    selectedPriority: PriorityLevel;
    handleSetSelectedDueDate: (date: Date) => void;
    selectedDueDate: Date;
};

export default function TaskFilter({
    users,
    handleSetSelectedTeamMember,
    handleSetSelectedDueDate,
    handleSetSelectedPriority,
    selectedDueDate,
    selectedPriority,
    selectedTeamMember,
}: TaskfilterProps) {
    return (
        <div className='task-filter'>
            <div className='task-filter__item'>
                <label htmlFor='team-member-select'>Team Member</label>

                <select
                    id='team-member-select'
                    value={selectedTeamMember?.id}
                    onChange={(e) => handleSetSelectedTeamMember(Number(e.target.value))}
                >
                    {users.map((user) => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className='task-filter__item'>
                <label htmlFor='team-member-select'>Priority</label>

                <select
                    id='team-member-select'
                    value={selectedPriority}
                    onChange={(e) => handleSetSelectedPriority(e.target.value as PriorityLevel)}
                >
                    {priorityLevels.map((priorityLevel) => (
                        <option
                            key={priorityLevel}
                            value={priorityLevel}
                        >
                            {priorityLevel}
                        </option>
                    ))}
                </select>
            </div>

            <div className='task-filter__item'>
                <label htmlFor='due-date'>Due Date:</label>

                <input
                    type='date'
                    id='due-date'
                    value={selectedDueDate.toISOString().split('T')[0]} // convert date to string in 'yyyy-mm-dd' format
                    onChange={(e) => {
                        handleSetSelectedDueDate(new Date(e.target.value));

                        if (e.target.value === '') {
                            handleSetSelectedDueDate(new Date());
                        }
                    }}
                />
            </div>
        </div>
    );
}
