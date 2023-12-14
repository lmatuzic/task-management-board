import { MouseEventHandler, ReactNode } from 'react';

type WarningButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function WarningButton({
    children,
    onClick,
    disabled,
    className = '',
    id,
    type = 'button',
}: WarningButtonProps) {
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn btn--warning ${className}`}
        >
            {children}
        </button>
    );
}
