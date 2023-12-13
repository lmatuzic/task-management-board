import { useEffect, useRef } from 'react';
import PrimaryButton from '../../../../components/button/PrimaryButton';
import useTaskContext from '../../context/useTaskContext';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import useTeamMembers from '../../hooks/useTeamMembers';
import Kanban from '../kanban/Kanban';
import TaskFilter from '../task-filter/TaskFilter';

export default function TaskManagementBoard() {
    const draggedTask = useRef<unknown>(null);

    const {
        tasks,
        taskName,
        teamMembers,
        isFetchingTeamMembers,
        handleSetTaskName,
        handleSetTasks,
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

    if (isFetchingTeamMembers) {
        return <div>Loading...</div>;
    }

    return (
        <div className='task-management-board'>
            <header>
                <div className='add-new-task'>
                    <input
                        type='text'
                        name='todo-name'
                        value={taskName}
                        placeholder='Type task name'
                        required
                        onChange={(e) => handleSetTaskName(e.target.value)}
                    />

                    <PrimaryButton
                        onClick={handleAddTask}
                        type='submit'
                    >
                        Add Task
                    </PrimaryButton>
                </div>

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

            <Kanban
                tasks={filteredTasks}
                draggedTask={draggedTask}
                handleSetTasks={handleSetTasks}
                handleSetSelectedDueDate={handleSetSelectedDueDate}
                users={teamMembers}
            />
        </div>
    );
}
