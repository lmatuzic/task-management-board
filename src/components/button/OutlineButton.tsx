import { MouseEventHandler, ReactNode } from 'react';

type OutlineButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function OutlineButton({
    children,
    onClick,
    disabled,
    className = '',
    id,
    type = 'button',
}: OutlineButtonProps) {
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn btn--outline ${className}`}
        >
            {children}
        </button>
    );
}
