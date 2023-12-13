import TaskManagementBoard from './components/task-management-board/TaskManagementBoard';
import { TaskContextProvider } from './context/TaskContext';

export default function Tasks() {
    return (
        <TaskContextProvider>
            <TaskManagementBoard />
        </TaskContextProvider>
    );
}
