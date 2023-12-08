import { ChangeEvent, useState } from 'react';
import PrimaryButton from '../../../components/buttons/primary-button/PrimaryButton';

type Todo = {
    id: string;
    name: string;
    column: 'to-do' | 'in-progress' | 'completed';
    sortIndex: number;
};

export default function DragAndDrop() {
    const [todoName, setTodoName] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleSetTodo = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoName(e.target.value);
    };

    return (
        <div className='task-management-board'>
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
        </div>
    );
}
