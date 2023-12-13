import { useCallback, useContext } from 'react';
import { TaskContext } from './TaskContext';
import { Task, TeamMember } from '../types';
import { setIsFetchingTeamMembers, setTaskName, setTasks, setTeamMembers } from './actions';

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

    return {
        tasks: state.tasks,
        teamMembers: state.teamMembers,
        taskName: state.taskName,
        isFetchingTeamMembers: state.isFetchingTeamMembers,
        handleSetTasks,
        handleSetTaskName,
        handleSetTeamMembers,
        handleSetIsFetchingTeamMembers,
    };
}
