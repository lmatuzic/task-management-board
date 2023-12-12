import { useState } from 'react';
import { PriorityLevel } from '../constants';
import { Task, TeamMember } from '../types';

type UseTaskFilterProps = {
    tasks: Task[];
    users: TeamMember[];
};

export function useTaskFilter({ tasks, users }: UseTaskFilterProps) {
    const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | string>('All');
    const [selectedDueDate, setSelectedDueDate] = useState(new Date());

    const handleSetSelectedTeamMember = (targetMemberId: number) => {
        const selectedUser = users.find((user) => user.id === targetMemberId);
        setSelectedTeamMember(selectedUser || null);
    };

    const handleSetSelectedPriority = (priorityLevel: PriorityLevel) => {
        setSelectedPriority(priorityLevel);
    };

    const handleSetSelectedDueDate = (date: Date) => {
        setSelectedDueDate(date || new Date());
    };

    const filteredTasks = tasks.filter((task) => {
        const isTeamMemberMatch = selectedTeamMember === null || task.assignedTeamMember?.id === selectedTeamMember?.id;
        const isPriorityMatch = selectedPriority === 'All' || task.priorityLevel === selectedPriority;

        const isDueDateMatch =
            !selectedDueDate ||
            task.dueDate.toISOString().split('T')[0] === selectedDueDate.toISOString().split('T')[0];

        return isTeamMemberMatch && isPriorityMatch && isDueDateMatch;
    });

    return {
        filteredTasks,
        selectedTeamMember,
        selectedPriority,
        selectedDueDate,
        handleSetSelectedTeamMember,
        handleSetSelectedPriority,
        handleSetSelectedDueDate,
    };
}
