import { Filter } from 'lucide-react';
import { useState } from 'react';
import OutlineButton from '../../../../components/button/OutlineButton';
import { PriorityLevel, priorityLevels } from '../../constants';
import useTaskContext from '../../context/useTaskContext';
import { TeamMember } from '../../types';
import { formatDate } from '../../utils/formatDate';

type TaskfilterProps = {
    handleSetSelectedTeamMember: (targetMemberId: number) => void;
    selectedTeamMember: TeamMember | null;
    handleSetSelectedPriority: (priorityLevel: PriorityLevel) => void;
    selectedPriority: PriorityLevel | string;
    handleSetSelectedDueDate: (date: string) => void;
    selectedDueDate: string;
};

export default function TaskFilter({
    handleSetSelectedTeamMember,
    handleSetSelectedDueDate,
    handleSetSelectedPriority,
    selectedDueDate,
    selectedPriority,
    selectedTeamMember,
}: TaskfilterProps) {
    const { teamMembers } = useTaskContext();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSetIsFilterOpen = () => {
        setIsFilterOpen((prevState) => !prevState);
    };

    return (
        <div className='task-filter'>
            <OutlineButton onClick={handleSetIsFilterOpen}>
                <Filter size={18} />
                <span>Filter</span>
            </OutlineButton>

            {isFilterOpen && (
                <div className='task-filter__wrapper'>
                    <div className='task-filter__item'>
                        <label htmlFor='team-member-select'>Team Member</label>

                        <select
                            id='team-member-select'
                            value={selectedTeamMember ? selectedTeamMember.id : 'All'}
                            onChange={(e) => handleSetSelectedTeamMember(Number(e.target.value))}
                        >
                            <option value='All'>All</option>

                            {teamMembers.map((user) => (
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
                        <label htmlFor='priority-select'>Priority</label>

                        <select
                            id='priority-select'
                            value={selectedPriority}
                            onChange={(e) => handleSetSelectedPriority(e.target.value as PriorityLevel)}
                        >
                            <option value='All'>All</option>

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
                        <label htmlFor='due-date'>Due Date</label>

                        <input
                            type='date'
                            id='due-date'
                            value={selectedDueDate}
                            onChange={(e) => {
                                handleSetSelectedDueDate(formatDate(new Date(e.target.value)));

                                if (e.target.value === '') {
                                    handleSetSelectedDueDate(formatDate(new Date()));
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
