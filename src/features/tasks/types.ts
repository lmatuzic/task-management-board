import { Column, PriorityLevel } from './constants';

export type Task = {
    id: string;
    name: string;
    dueDate: Date;
    assignedTeamMember: string;
    priorityLevel: PriorityLevel;
    column: Column;
    // sortIndex: number;
};
