import PrimaryButton from '../../../../components/button/PrimaryButton';
import useHandleTaskInputError from '../../hooks/useHandleTaskInputError';
import { Task } from '../../types';

type TaskInputProps = {
    tasks: Task[];
    taskName: string;
    handleSetTaskName: (taskName: string) => void;
    handleAddTask: () => void;
};

export default function TaskInput({ tasks, taskName, handleSetTaskName, handleAddTask }: TaskInputProps) {
    const { handleSetTaskInputError, taskInputError } = useHandleTaskInputError();

    return (
        <div className='add-new-task'>
            <div className='input-wrapper'>
                <input
                    type='text'
                    name='todo-name'
                    value={taskName}
                    placeholder='Type task name'
                    required
                    onChange={(e) => {
                        handleSetTaskInputError(e.target.value, tasks);
                        handleSetTaskName(e.target.value);
                    }}
                />

                {taskInputError.length > 1 && <span className='input-error'>{taskInputError}</span>}
            </div>

            <PrimaryButton
                onClick={() => {
                    if (taskName.length < 1) handleSetTaskInputError(taskName);
                    if (taskInputError) return;
                    handleAddTask();
                }}
            >
                Add Task
            </PrimaryButton>
        </div>
    );
}
