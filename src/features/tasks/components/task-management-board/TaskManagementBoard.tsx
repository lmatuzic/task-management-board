import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PrimaryButton from '../../../../components/button/primary-button/PrimaryButton';
import { fetchUsers } from '../../actions/fetchUsers';
import { Column, PriorityLevel, taskBoardColumns } from '../../constants';
import { Task, TeamMember } from '../../types';
import Kanban from '../kanban/Kanban';
import TaskFilter from '../task-filter/TaskFilter';

export default function TaskManagementBoard() {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // filter states
    const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
    const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | string>('All');
    const [selectedDueDate, setSelectedDueDate] = useState(new Date());

    const draggedTask = useRef<unknown>(null);

    const handleSetTaskName = (name: string) => {
        setTaskName(name);
    };

    const handleSetTasks = (tasks: Task[]) => {
        setTasks(tasks);
    };

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
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === draggedTask.current ? { ...task, column } : task)),
        );
    };

    const handleSetSelectedTeamMember = (targetMemberId: number) => {
        const selectedUser = users.find((user) => user.id === targetMemberId);
        setSelectedTeamMember(selectedUser || null);
    };

    const handleSetSelectedPriority = (priorityLevel: PriorityLevel) => {
        setSelectedPriority(priorityLevel);
    };

    const handleSetSelectedDueDate = (date: Date) => {
        setSelectedDueDate(date || new Date());
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userData = await fetchUsers();

                if (userData) {
                    setUsers(userData);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTasks = tasks.filter((task) => {
        const isTeamMemberMatch = selectedTeamMember === null || task.assignedTeamMember?.id === selectedTeamMember?.id;
        const isPriorityMatch = selectedPriority === 'All' || task.priorityLevel === selectedPriority;

        const isDueDateMatch =
            !selectedDueDate ||
            task.dueDate.toISOString().split('T')[0] === selectedDueDate.toISOString().split('T')[0];

        return isTeamMemberMatch && isPriorityMatch && isDueDateMatch;
    });

    if (isLoading) {
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
                        content={<>Add Task</>}
                        type='submit'
                    />
                </div>

                <TaskFilter
                    users={users}
                    handleSetSelectedTeamMember={handleSetSelectedTeamMember}
                    selectedTeamMember={selectedTeamMember}
                    handleSetSelectedDueDate={handleSetSelectedDueDate}
                    selectedDueDate={selectedDueDate}
                    handleSetSelectedPriority={handleSetSelectedPriority}
                    selectedPriority={selectedPriority}
                />
            </header>

            <Kanban
                taskBoardColumns={taskBoardColumns}
                tasks={filteredTasks}
                handleOnDragStart={handleOnDragStart}
                draggedTask={draggedTask}
                handleColumnDrop={handleColumnDrop}
                handleSetTasks={handleSetTasks}
                handleSetSelectedDueDate={handleSetSelectedDueDate}
                users={users}
            />
        </div>
    );
}
