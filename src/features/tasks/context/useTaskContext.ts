import { useCallback, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Column, PriorityLevel } from '../constants';
import { Task, TeamMember } from '../types';
import { formatDate } from '../utils/formatDate';
import { TaskContext } from './TaskContext';
import { setDueDate, setIsFetchingTeamMembers, setTaskName, setTasks, setTeamMembers } from './actions';

export default function useTaskContext() {
    const { state, dispatch } = useContext(TaskContext);

    const handleSetTasks = useCallback((tasks: Task[]) => dispatch(setTasks(tasks)), [dispatch]);
    const handleSetTaskName = useCallback((taskName: string) => dispatch(setTaskName(taskName)), [dispatch]);

    const handleSetTeamMembers = useCallback(
        (teamMembers: TeamMember[]) => dispatch(setTeamMembers(teamMembers)),
        [dispatch],
    );

    const handleSetIsFetchingTeamMembers = useCallback(
        (isFetching: boolean) => dispatch(setIsFetchingTeamMembers(isFetching)),
        [dispatch],
    );

    const handleSetDueDate = useCallback((dueDate: string) => dispatch(setDueDate(dueDate)), [dispatch]);

    const handleAddTask = useCallback(() => {
        const taskPayload: Task = {
            id: uuidv4(),
            name: state.taskName,
            column: Column.TO_DO,
            dueDate: formatDate(new Date()),
            assignedTeamMember: null,
            priorityLevel: PriorityLevel.LOW,
        };

        if (taskPayload.name.length < 1) {
            return;
        }

        handleSetTasks([...state.tasks, taskPayload]);
        handleSetTaskName('');
    }, [handleSetTaskName, handleSetTasks, state.taskName, state.tasks]);

    const handleDeleteTask = (editedTask: Task, closeEditDialog: () => void) => {
        const updatedTasks = state.tasks.filter((task) => task.id !== editedTask.id);
        handleSetTasks(updatedTasks);
        closeEditDialog;
    };

    return {
        tasks: state.tasks,
        teamMembers: state.teamMembers,
        taskName: state.taskName,
        isFetchingTeamMembers: state.isFetchingTeamMembers,
        handleSetTasks,
        handleSetTaskName,
        handleSetTeamMembers,
        handleSetIsFetchingTeamMembers,
        handleAddTask,
        handleDeleteTask,
        handleSetDueDate,
    };
}
