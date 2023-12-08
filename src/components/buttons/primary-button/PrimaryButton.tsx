import { MouseEventHandler, ReactNode } from 'react';

type PrimaryButtonProps = {
    content: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    id?: string;
};

export default function PrimaryButton({ onClick, disabled, content, className = '', id }: PrimaryButtonProps) {
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            type='button'
            className={`btn btn--primary ${className}`}
        >
            {content}
        </button>
    );
}
