import { Task, TeamMember } from '../types';
import { TaskActionTypes } from './actions';
import { TaskActions } from './types';

export type TaskState = {
    tasks: Task[];
    taskName: string;
    teamMembers: TeamMember[];
    isFetchingTeamMembers: boolean;
};

export default function taskReducer(state: TaskState, action: TaskActions) {
    switch (action.type) {
        case TaskActionTypes.SET_TASKS:
            return {
                ...state,
                tasks: action.payload,
            };

        case TaskActionTypes.SET_TASK_NAME:
            return {
                ...state,
                taskName: action.payload,
            };

        case TaskActionTypes.SET_TEAM_MEMBERS:
            return {
                ...state,
                teamMembers: action.payload,
            };

        case TaskActionTypes.SET_IS_FETCHING_TEAM_MEMBERS:
            return {
                ...state,
                isFetchingTeamMembers: action.payload,
            };

        case TaskActionTypes.SET_DUE_DATE:
            return {
                ...state,
                dueDate: action.payload,
            };

        default:
            return state;
    }
}
