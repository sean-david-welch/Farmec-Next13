'use client';
import styles from '~/styles/Utils.module.css';

import { motion } from 'framer-motion';

const spinTransition = {
    loop: Infinity,
    ease: 'linear',
    duration: 1,
};

function LoadingSpinner() {
    return (
        <div className={styles.loadingPage}>
            <>
                <motion.div
                    className={styles.spinner}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                />
            </>
        </div>
    );
}

export default LoadingSpinner;
