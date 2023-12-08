import { ChangeEvent } from 'react';
import PrimaryButton from '../../../../components/buttons/primary-button/PrimaryButton';

type TodosHeaderProps = {
    todoName: string;
    handleSetTodo: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function TodosHeader({ todoName, handleSetTodo }: TodosHeaderProps) {
    return (
        <header className='task-management-board__header'>
            <input
                type='text'
                name='todo-name'
                value={todoName}
                placeholder='Add todo'
                onChange={handleSetTodo}
            />

            <PrimaryButton content={<>Add Todo</>} />
        </header>
    );
}
