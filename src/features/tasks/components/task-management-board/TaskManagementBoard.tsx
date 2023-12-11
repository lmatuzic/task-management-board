import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchUsers } from '../../actions/fetchUsers';
import { Column, PriorityLevel, taskBoardColumns } from '../../constants';
import { Task, User } from '../../types';
import Kanban from '../kanban/Kanban';
import TodosHeader from '../tasks-header/TasksHeader';

export default function TaskManagementBoard() {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTeamMember, setSelectedTeamMember] = useState<User | null>(null);

    const draggedTask = useRef<unknown>(null);

    const handleSetTaskName = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
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
            assignedTeamMember: users[0],
            priorityLevel: PriorityLevel.HIGH,
        };

        if (taskPayload.name.length < 1) {
            return;
        }

        handleSetTasks([...tasks, taskPayload]);
    };

    const handleOnDragStart = (task: Task) => {
        draggedTask.current = task.id; // assigning currently dragged task ref to the one we're dragging
    };

    const handleColumnDrop = (column: Column) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === draggedTask.current ? { ...task, column } : task)),
        );
    };

    const handleSetSelectedTeamMember = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedUser = users.find((user) => user.id === Number(e.target.value));
        setSelectedTeamMember(selectedUser || null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userData = await fetchUsers();

                if (userData) {
                    setUsers(userData);
                    setSelectedTeamMember(userData[0]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTasks = selectedTeamMember
        ? tasks.filter((task) => task.assignedTeamMember?.id === selectedTeamMember.id)
        : tasks;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='task-management-board'>
            <TodosHeader
                taskName={taskName}
                handleSetTaskName={handleSetTaskName}
                handleAddTask={handleAddTask}
                users={users}
                handleSetSelectedTeamMember={handleSetSelectedTeamMember}
                selectedTeamMember={selectedTeamMember}
            />

            <Kanban
                taskBoardColumns={taskBoardColumns}
                tasks={filteredTasks}
                handleOnDragStart={handleOnDragStart}
                draggedTask={draggedTask}
                handleColumnDrop={handleColumnDrop}
            />
        </div>
    );
}
