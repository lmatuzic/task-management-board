import { useState } from 'react';
import { PriorityLevel } from '../constants';
import { Task, TeamMember } from '../types';
import { formatDate } from '../utils/formatDate';

type UseTaskFilterProps = {
    tasks: Task[];
    teamMembers: TeamMember[];
};

export function useTaskFilter({ tasks, teamMembers }: UseTaskFilterProps) {
    const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | string>('All');
    const [selectedDueDate, setSelectedDueDate] = useState(formatDate(new Date()));

    const handleSetSelectedTeamMember = (targetMemberId: number) => {
        const selectedUser = teamMembers.find((user) => user.id === targetMemberId);
        setSelectedTeamMember(selectedUser || null);
    };

    const handleSetSelectedPriority = (priorityLevel: PriorityLevel) => {
        setSelectedPriority(priorityLevel);
    };

    const handleSetSelectedDueDate = (date: string) => {
        setSelectedDueDate(date);
    };

    const filteredTasks = tasks.filter((task) => {
        const isTeamMemberMatch = selectedTeamMember === null || task.assignedTeamMember?.id === selectedTeamMember?.id;
        const isPriorityMatch = selectedPriority === 'All' || task.priorityLevel === selectedPriority;
        const isDueDateMatch = !selectedDueDate || task.dueDate === selectedDueDate;

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
