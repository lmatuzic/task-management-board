import { Task } from './types';
import { v4 as uuidv4 } from 'uuid';

export enum Column {
    TO_DO = 'To Do',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
}

export enum PriorityLevel {
    LOW = 'Low',
    HIGH = 'HIGH',
    CRITICAL = 'Critical',
}

export const taskBoardColumns = Object.values(Column);

export const sampleTasks: Task[] = [
    {
        id: uuidv4(),
        name: 'Todo item 1',
        dueDate: new Date(),
        priorityLevel: PriorityLevel.LOW,
        assignedTeamMember: 'User 1',
        column: Column.TO_DO,
        sortIndex: 1,
    },
    {
        id: uuidv4(),
        name: 'Todo item 2',
        dueDate: new Date(),
        priorityLevel: PriorityLevel.LOW,
        assignedTeamMember: 'User 2',
        column: Column.TO_DO,
        sortIndex: 1,
    },
    {
        id: uuidv4(),
        name: 'Todo item 3',
        dueDate: new Date(),
        priorityLevel: PriorityLevel.LOW,
        assignedTeamMember: 'User 3',
        column: Column.TO_DO,
        sortIndex: 1,
    },
];
