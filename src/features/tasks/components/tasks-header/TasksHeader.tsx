import { ChangeEvent } from 'react';
import PrimaryButton from '../../../../components/button/primary-button/PrimaryButton';
import { User } from '../../types';
import { PriorityLevel, priorityLevels } from '../../constants';

type TasksHeaderProps = {
    taskName: string;
    handleSetTaskName: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddTask: () => void;
    users: User[];
    handleSetSelectedTeamMember: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedTeamMember: User | null;
    handleSetSelectedPriority: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedPriority: PriorityLevel;
};

export default function TasksHeader({
    taskName,
    handleSetTaskName,
    handleAddTask,
    users,
    handleSetSelectedTeamMember,
    selectedTeamMember,
    handleSetSelectedPriority,
    selectedPriority,
}: TasksHeaderProps) {
    // const username = `${selectedTeamMember.firstName} ${selectedTeamMember.lastName}`;

    return (
        <header>
            <div className='add-new-task'>
                <input
                    type='text'
                    name='todo-name'
                    value={taskName}
                    placeholder='Type task name'
                    onChange={handleSetTaskName}
                />

                <PrimaryButton
                    onClick={handleAddTask}
                    content={<>Add Task</>}
                />
            </div>

            <div className='task-filter'>
                <div>
                    <label htmlFor='team-member-select'>Team Member</label>

                    <select
                        id='team-member-select'
                        value={selectedTeamMember?.id}
                        onChange={handleSetSelectedTeamMember}
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

                <div>
                    <label htmlFor='team-member-select'>Priority</label>

                    <select
                        id='team-member-select'
                        value={selectedPriority}
                        onChange={handleSetSelectedPriority}
                    >
                        {priorityLevels.map((priorityLevel, index) => (
                            <option
                                key={index}
                                value={priorityLevel}
                            >
                                {priorityLevel}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </header>
    );
}
