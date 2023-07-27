'use client';

import utils from '~/styles/Utils.module.css';
import { useState, useRef } from 'react';

interface Props {
    children: React.ReactNode;
}

export const FormDialog = ({ children }: Props) => {
    const [showForm, setShowForm] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    function openDialog() {
        setShowForm(true);
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }

    function closeDialog() {
        setShowForm(false);
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    }

    return (
        <dialog ref={dialogRef} className={utils.dialog}>
            {children}
        </dialog>
    );
};
