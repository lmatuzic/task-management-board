import { Column } from '../constants';
import useTaskContext from '../context/useTaskContext';
import { Task } from '../types';

type UseDragAndDropProps = {
    draggedTask: React.MutableRefObject<unknown>;
};

export default function useDragAndDrop({ draggedTask }: UseDragAndDropProps) {
    const { handleSetTasks } = useTaskContext();

    const handleOnDragStart = (task: Task) => {
        draggedTask.current = task.id; // assigning currently dragged task ref to the one we're dragging
    };

    const handleColumnDrop = (tasks: Task[], column: Column) => {
        const updatedTasks = tasks.map((task) => (task.id === draggedTask.current ? { ...task, column } : task));
        handleSetTasks(updatedTasks);
    };

    return { handleOnDragStart, handleColumnDrop };
}
