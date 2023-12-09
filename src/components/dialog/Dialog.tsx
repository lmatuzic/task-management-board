import { PropsWithChildren, ReactNode } from 'react';
import Portal from './Portal';
import PrimaryButton from '../button/primary-button/PrimaryButton';

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
                            <PrimaryButton
                                onClick={closeDialog}
                                content={<>Close</>}
                            />
                        </div>
                    </dialog>
                </Portal>
            ) : null}
        </>
    );
}
