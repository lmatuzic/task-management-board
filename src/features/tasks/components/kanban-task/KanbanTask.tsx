import useTaskContext from '../../context/useTaskContext';
import useEditTask from '../../hooks/useEditTask';
import { Task } from '../../types';
import EditTaskDialog from '../edit-task-dialog/EditTaskDialog';

type KanbanTaskProps = {
    task: Task;
    handleOnDragStart: (task: Task) => void;
};

export default function KanbanTask({ task, handleOnDragStart }: KanbanTaskProps) {
    const { handleDeleteTask, tasks, handleSetTasks, teamMembers, handleSetDueDate } = useTaskContext();

    const {
        openDialog,
        closeDialog,
        isDialogOpen,
        handleTaskPropertyChange,
        isEditing,
        editedTask,
        startTaskEdit,
        closeTaskEdit,
    } = useEditTask({
        tasks,
        task,
        handleSetTasks,
    });

    return (
        <>
            <div
                className='kanban-task'
                draggable
                onDragStart={() => handleOnDragStart(task)}
                onClick={openDialog}
                tabIndex={0}
            >
                <h3>{task.name}</h3>
            </div>

            <EditTaskDialog
                isDialogOpen={isDialogOpen}
                isEditing={isEditing}
                task={task}
                editedTask={editedTask}
                teamMembers={teamMembers}
                handleDeleteTask={handleDeleteTask}
                startTaskEdit={startTaskEdit}
                closeDialog={closeDialog}
                handleTaskPropertyChange={handleTaskPropertyChange}
                handleSetDueDate={handleSetDueDate}
                closeTaskEdit={closeTaskEdit}
            />
        </>
    );
}
