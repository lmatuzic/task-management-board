import { Column, PriorityLevel } from './constants';

export type Task = {
    id: string;
    name: string;
    dueDate: Date;
    assignedTeamMember: TeamMember | null;
    priorityLevel: PriorityLevel | string;
    column: Column;
};

export type TeamMember = {
    id: number;
    name: string;
    username: string;
    email: string;
};
