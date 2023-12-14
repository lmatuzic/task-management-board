import { Task, TeamMember } from '../types';
import { SetDueDate, SetIsFetchingTeamMembers, SetTaskName, SetTasks, SetTeamMembers } from './types';

export enum TaskActionTypes {
    SET_TASKS = 'SET_TASKS',
    SET_TASK_NAME = 'SET_TASK_NAME',
    SET_TEAM_MEMBERS = 'SET_TEAM_MEMBERS',
    SET_IS_FETCHING_TEAM_MEMBERS = 'SET_IS_FETCHING_TEAM_MEMBERS',
    SET_DUE_DATE = 'SET_DUE_DATE',
    SET_TASK_INPUT_ERROR = 'SET_TASK_INPUT_ERROR',
}

export const setTasks = (payload: Task[]): SetTasks => ({
    type: TaskActionTypes.SET_TASKS,
    payload,
});

export const setTaskName = (payload: string): SetTaskName => ({
    type: TaskActionTypes.SET_TASK_NAME,
    payload,
});

export const setTeamMembers = (payload: TeamMember[]): SetTeamMembers => ({
    type: TaskActionTypes.SET_TEAM_MEMBERS,
    payload,
});

export const setIsFetchingTeamMembers = (payload: boolean): SetIsFetchingTeamMembers => ({
    type: TaskActionTypes.SET_IS_FETCHING_TEAM_MEMBERS,
    payload,
});

export const setDueDate = (payload: string): SetDueDate => ({
    type: TaskActionTypes.SET_DUE_DATE,
    payload,
});
