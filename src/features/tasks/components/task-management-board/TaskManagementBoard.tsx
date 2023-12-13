import { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PrimaryButton from '../../../../components/button/primary-button/PrimaryButton';
import { fetchUsers } from '../../actions/fetchUsers';
import { Column, PriorityLevel, taskBoardColumns } from '../../constants';
import useTaskContext from '../../context/useTaskContext';
import { useTaskFilter } from '../../hooks/useTaskFilter';
import { Task, TeamMember } from '../../types';
import Kanban from '../kanban/Kanban';
import TaskFilter from '../task-filter/TaskFilter';

export default function TaskManagementBoard() {
    const {
        tasks,
        taskName,
        teamMembers,
        isFetchingTeamMembers,
        handleSetTaskName,
        handleSetTasks,
        handleSetTeamMembers,
        handleSetIsFetchingTeamMembers,
    } = useTaskContext();

    const draggedTask = useRef<unknown>(null);

    const {
        filteredTasks,
        selectedTeamMember,
        selectedPriority,
        selectedDueDate,
        handleSetSelectedTeamMember,
        handleSetSelectedPriority,
        handleSetSelectedDueDate,
    } = useTaskFilter({ tasks, teamMembers });

    const handleAddTask = () => {
        const taskPayload: Task = {
            id: uuidv4(),
            name: taskName,
            column: Column.TO_DO,
            dueDate: new Date(),
            assignedTeamMember: null,
            priorityLevel: PriorityLevel.LOW,
        };

        if (taskPayload.name.length < 1) {
            return;
        }

        handleSetTasks([...tasks, taskPayload]);
        handleSetTaskName('');
    };

    const handleOnDragStart = (task: Task) => {
        draggedTask.current = task.id; // assigning currently dragged task ref to the one we're dragging
    };

    const handleColumnDrop = (column: Column) => {
        const updatedTasks = tasks.map((task) => (task.id === draggedTask.current ? { ...task, column } : task));
        handleSetTasks(updatedTasks);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                handleSetIsFetchingTeamMembers(true);
                const fetchedUsers: TeamMember[] = await fetchUsers();

                if (fetchedUsers) {
                    handleSetTeamMembers(fetchedUsers);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                handleSetIsFetchingTeamMembers(false);
            }
        };

        fetchData();
    }, [handleSetIsFetchingTeamMembers, handleSetTeamMembers]);

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
                        teamMembers={teamMembers}
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
                taskBoardColumns={taskBoardColumns}
                tasks={filteredTasks}
                handleOnDragStart={handleOnDragStart}
                draggedTask={draggedTask}
                handleColumnDrop={handleColumnDrop}
                handleSetTasks={handleSetTasks}
                handleSetSelectedDueDate={handleSetSelectedDueDate}
                users={teamMembers}
            />
        </div>
    );
}
