import { X } from 'lucide-react';
import { PropsWithChildren, ReactNode } from 'react';
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
                        <X
                            onClick={closeDialog}
                            className='close-dialog-icon'
                            size={20}
                        />
                        {children}
                    </dialog>
                </Portal>
            ) : null}
        </>
    );
}
