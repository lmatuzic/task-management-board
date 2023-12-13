import { MouseEventHandler, ReactNode } from 'react';

type PrimaryButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function PrimaryButton({
    children,
    onClick,
    disabled,
    className = '',
    id,
    type = 'button',
}: PrimaryButtonProps) {
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn btn--primary ${className}`}
        >
            {children}
        </button>
    );
}
