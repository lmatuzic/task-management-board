import { Column, PriorityLevel } from './constants';

export type Task = {
    id: string;
    name: string;
    dueDate: Date;
    assignedTeamMember: User | null;
    priorityLevel: PriorityLevel | string;
    column: Column;
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};
