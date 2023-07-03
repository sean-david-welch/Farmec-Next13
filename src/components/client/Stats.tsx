'use client';
import styles from '../styles/Info.module.css';
import utils from '~/styles/Utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faBusinessTime,
    faHandshake,
    faWrench,
} from '@fortawesome/free-solid-svg-icons';

const StatsSection = () => {
    interface ItemProps {
        title: string;
        description: string;
        icon: string;
        link: string;
    }

    return <div className={styles.stats}></div>;
};

export default StatsSection;
