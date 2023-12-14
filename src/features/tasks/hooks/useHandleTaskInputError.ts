import { useCallback, useState } from 'react';
import { Task } from '../types';

export default function useHandleTaskInputError() {
    const [taskInputError, setTaskInputError] = useState('');

    const handleSetTaskInputError = useCallback((input: string, tasks?: Task[]) => {
        if (input.length < 1) {
            setTaskInputError('Task name is required');
        }

        if (tasks && tasks.some((task) => task.name === input)) {
            setTaskInputError('Task name must be unique');
        }

        if (input.length >= 1 && (!tasks || !tasks.some((task) => task.name === input))) {
            setTaskInputError('');
        }
    }, []);

    return { taskInputError, handleSetTaskInputError };
}
