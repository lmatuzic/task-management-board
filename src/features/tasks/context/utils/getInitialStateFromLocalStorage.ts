import { TaskState } from '../reducer';

export const getInitialStateFromLocalStorage = (initialState: TaskState) => {
    try {
        const localData = localStorage.getItem('tasks');
        return localData ? JSON.parse(localData) : initialState;
    } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return [];
    }
};
