import { ReactNode, Dispatch } from 'react';

export interface ContextProviderProps {
    children: ReactNode;
}

export interface ContextProps<T1, T2> {
    state: T1;
    dispatch: Dispatch<T2>;
}
