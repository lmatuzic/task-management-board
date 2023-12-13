import { Task, TeamMember } from '../types';
import { TaskActionTypes } from './constants';
import { SetIsFetchingTeamMembers, SetTaskName, SetTasks, SetTeamMembers } from './types';

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
