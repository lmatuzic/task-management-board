import { useEffect } from 'react';
import LoadingSpinner from '../../../../components/loading/loading-spinner/LoadingSpinner';
import useTaskContext from '../../context/useTaskContext';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import useTeamMembers from '../../hooks/useTeamMembers';
import Kanban from '../kanban/Kanban';
import TaskFilter from '../task-filter/TaskFilter';
import TaskInput from '../task-input/TaskInput';

export default function TaskManagementBoard() {
    const {
        tasks,
        taskName,
        teamMembers,
        isFetchingTeamMembers,
        handleSetTaskName,
        handleSetTeamMembers,
        handleSetIsFetchingTeamMembers,
        handleAddTask,
    } = useTaskContext();

    const {
        filteredTasks,
        selectedTeamMember,
        selectedPriority,
        selectedDueDate,
        handleSetSelectedTeamMember,
        handleSetSelectedPriority,
        handleSetSelectedDueDate,
    } = useTaskFilter({ tasks, teamMembers });

    const { fetchTeamMembers } = useTeamMembers({ handleSetIsFetchingTeamMembers, handleSetTeamMembers });

    useEffect(() => {
        fetchTeamMembers();
    }, [fetchTeamMembers]);

    return (
        <div className='task-management-board'>
            {isFetchingTeamMembers ? (
                <LoadingSpinner />
            ) : (
                <>
                    <header>
                        <TaskInput
                            tasks={tasks}
                            taskName={taskName}
                            handleSetTaskName={handleSetTaskName}
                            handleAddTask={handleAddTask}
                        />

                        {teamMembers && (
                            <TaskFilter
                                handleSetSelectedTeamMember={handleSetSelectedTeamMember}
                                selectedTeamMember={selectedTeamMember}
                                handleSetSelectedDueDate={handleSetSelectedDueDate}
                                selectedDueDate={selectedDueDate}
                                handleSetSelectedPriority={handleSetSelectedPriority}
                                selectedPriority={selectedPriority}
                            />
                        )}
                    </header>

                    <Kanban tasks={filteredTasks} />
                </>
            )}
        </div>
    );
}
