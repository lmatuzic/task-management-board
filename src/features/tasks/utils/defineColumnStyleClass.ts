import { Column } from '../constants';

export const defineColumnStyleClass = (column: string) => {
    if (column === Column.IN_PROGRESS) {
        return 'in-progress';
    }

    if (column === Column.COMPLETED) {
        return 'completed';
    }

    return 'to-do';
};
