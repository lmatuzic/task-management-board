import { createContext, useMemo, useReducer } from 'react';
import { ContextProps, ContextProviderProps } from '../../../context/types';
import { TaskActions } from './types';
import taskReducer, { TaskState } from './reducer';

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
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);

    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};
