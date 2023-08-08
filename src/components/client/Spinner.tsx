'use client';

import styles from '~/styles/Utils.module.css';

const Spinner = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export default Spinner;
