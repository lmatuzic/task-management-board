import { PropsWithChildren, ReactNode } from 'react';
import PrimaryButton from '../button/primary-button/PrimaryButton';
import Portal from './Portal';

type DialogProps = {
    children: ReactNode;
    isOpen: boolean;
    closeDialog: () => void;
    className?: string;
};

export default function Dialog({ children, isOpen, closeDialog, className = '' }: PropsWithChildren<DialogProps>) {
    return (
        <>
            {isOpen ? (
                <Portal>
                    <div className='dialog-overlay'></div>

                    <dialog
                        open={isOpen}
                        onClose={closeDialog}
                        className={`dialog ${className}`}
                    >
                        {children}

                        <div className='dialog-btn-container'>
                            <PrimaryButton onClick={closeDialog}>Close</PrimaryButton>
                        </div>
                    </dialog>
                </Portal>
            ) : null}
        </>
    );
}
