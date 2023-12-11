import { MouseEventHandler, PropsWithChildren, ReactNode } from 'react';

type PrimaryButtonProps = {
    content: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function PrimaryButton({
    onClick,
    disabled,
    content,
    className = '',
    id,
    type = 'button',
}: PropsWithChildren<PrimaryButtonProps>) {
    return (
        <button
            id={id}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`btn btn--primary ${className}`}
        >
            {content}
        </button>
    );
}
