import { useState } from 'react';
import { Task } from '../types';

type PropertyType = 'name' | 'dueDate' | 'priorityLevel' | 'assignedTeamMember';

type UseHandleTaskProps = {
    tasks: Task[];
    task: Task;
    handleSetTasks: (tasks: Task[]) => void;
};

export default function useHandleTask({ tasks, handleSetTasks, task }: UseHandleTaskProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const closeTaskEdit = () => {
        setIsEditing(false);
    };

    const startTaskEdit = () => {
        setIsEditing(true);
    };

    const openDialog = () => {
        setIsDialogOpen(true);
        setEditedTask(task);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        closeTaskEdit();
    };

    const handleTaskPropertyChange = <T extends PropertyType>(property: T, value: Task[T]) => {
        if (editedTask) {
            setEditedTask((prevTask) => ({
                ...prevTask,
                [property]: value,
            }));

            const updatedTasks = tasks.map((taskItem) =>
                taskItem.id === editedTask.id ? { ...taskItem, [property]: value } : taskItem,
            );

            handleSetTasks(updatedTasks);
        }
    };

    const handleDeleteTask = () => {
        if (editedTask) {
            const updatedTasks = tasks.filter((task) => task.id !== editedTask.id);
            handleSetTasks(updatedTasks);
            setIsDialogOpen(false);
        }
    };

    return {
        isEditing,
        editedTask,
        isDialogOpen,
        openDialog,
        closeDialog,
        handleTaskPropertyChange,
        handleDeleteTask,
        closeTaskEdit,
        startTaskEdit,
    };
}
