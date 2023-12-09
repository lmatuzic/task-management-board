import { PropsWithChildren, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalDialogProps = {
    children: ReactNode;
};

export default function Portal({ children }: PropsWithChildren<PortalDialogProps>) {
    const portalRoot = document.getElementById('portal-root');
    return portalRoot ? createPortal(children, portalRoot) : null;
}
