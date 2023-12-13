import { createContext, useEffect, useMemo, useReducer } from 'react';
import { ContextProps, ContextProviderProps } from '../../../context/types';
import taskReducer, { TaskState } from './reducer';
import { TaskActions } from './types';

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

const getInitialStateFromLocalStorage = () => {
    try {
        const localData = localStorage.getItem('tasks');
        return localData ? JSON.parse(localData) : initialState;
    } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return [];
    }
};

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
