import { Task, TeamMember } from '../types';
import { TaskActionTypes } from './actions';

export type SetTasks = {
    type: TaskActionTypes.SET_TASKS;
    payload: Task[] | [];
};

export type SetTaskName = {
    type: TaskActionTypes.SET_TASK_NAME;
    payload: string;
};

export type SetTeamMembers = {
    type: TaskActionTypes.SET_TEAM_MEMBERS;
    payload: TeamMember[] | [];
};

export type SetIsFetchingTeamMembers = {
    type: TaskActionTypes.SET_IS_FETCHING_TEAM_MEMBERS;
    payload: boolean;
};

export type SetDueDate = {
    type: TaskActionTypes.SET_DUE_DATE;
    payload: string;
};

export type SetTaskInputError = {
    type: TaskActionTypes.SET_TASK_INPUT_ERROR;
    payload: string;
};

export type TaskActions =
    | SetTasks
    | SetTaskName
    | SetTeamMembers
    | SetIsFetchingTeamMembers
    | SetDueDate
    | SetTaskInputError;
