export enum Column {
    TO_DO = 'To Do',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
}

export enum PriorityLevel {
    LOW = 'Low',
    HIGH = 'High',
    CRITICAL = 'Critical',
}

export const priorityLevels: PriorityLevel[] = [PriorityLevel.LOW, PriorityLevel.HIGH, PriorityLevel.CRITICAL];

export const taskBoardColumns = Object.values(Column);
