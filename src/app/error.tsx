'use client';
import utils from '~/styles/Utils.module.css';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={utils.loadingPage}>
            <h1 className={utils.sectionHeading}>Something went wrong!</h1>
            <button className={utils.btn} onClick={() => reset()}>
                Try again
            </button>
        </div>
    );
}
