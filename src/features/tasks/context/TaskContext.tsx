import { createContext, useEffect, useMemo, useReducer } from 'react';
import { ContextProps, ContextProviderProps } from '../../../context/types';
import taskReducer, { TaskState } from './reducer';
import { TaskActions } from './types';
import { getInitialStateFromLocalStorage } from './utils/getInitialStateFromLocalStorage';

const initialState: TaskState = {
    tasks: [],
    taskName: '',
    teamMembers: [],
    isFetchingTeamMembers: false,
};

export const TaskContext = createContext<ContextProps<TaskState, TaskActions>>({
    state: initialState,
    dispatch: () => null,
});

export const TaskContextProvider = ({ children }: ContextProviderProps) => {
    const [state, dispatch] = useReducer(taskReducer, initialState, getInitialStateFromLocalStorage);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state));
    }, [state]);

    // reasoning behind using useMemo for data and dispatch can be explored in this article: https://hswolff.com/blog/how-to-usecontext-with-usereducer/#performance-concerns
    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};
