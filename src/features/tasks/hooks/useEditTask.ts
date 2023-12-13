import { useState } from 'react';
import { PropertyType, Task } from '../types';

type UseHandleTaskProps = {
    tasks: Task[];
    task: Task;
    handleSetTasks: (tasks: Task[]) => void;
};

export default function useEditTask({ tasks, handleSetTasks, task }: UseHandleTaskProps) {
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
        setEditedTask((prevTask) => ({
            ...prevTask,
            [property]: value,
        }));

        const updatedTasks = tasks.map((taskItem) =>
            taskItem.id === editedTask.id ? { ...taskItem, [property]: value } : taskItem,
        );

        handleSetTasks(updatedTasks);
    };

    return {
        isEditing,
        editedTask,
        isDialogOpen,
        openDialog,
        closeDialog,
        handleTaskPropertyChange,
        closeTaskEdit,
        startTaskEdit,
    };
}
