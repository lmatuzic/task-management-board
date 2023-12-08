import { ChangeEvent, useState } from 'react';
import { Column } from '../../constants';
import TodosHeader from '../todos-header/TodosHeader';

type Todo = {
    id: string;
    name: string;
    column: Column.TO_DO | Column.IN_PROGRESS | Column.COMPLETED;
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
            <TodosHeader
                todoName={todoName}
                handleSetTodo={handleSetTodo}
            />
        </div>
    );
}
