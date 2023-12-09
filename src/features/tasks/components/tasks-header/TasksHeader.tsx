import { ChangeEvent } from 'react';
import PrimaryButton from '../../../../components/button/primary-button/PrimaryButton';

type TasksHeaderProps = {
    taskName: string;
    handleSetTaskName: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddTask: () => void;
};

export default function TasksHeader({ taskName, handleSetTaskName, handleAddTask }: TasksHeaderProps) {
    return (
        <header className='task-management-board__header'>
            <input
                type='text'
                name='todo-name'
                value={taskName}
                placeholder='Type task name'
                onChange={handleSetTaskName}
            />

            <PrimaryButton
                onClick={handleAddTask}
                content={<>Add Task</>}
            />
        </header>
    );
}
