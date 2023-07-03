'use client';
import styles from '../styles/Info.module.css';
import utils from '~/styles/Utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTractor,
    faToolbox,
    faGears,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

const SpecialsSection = () => {
    interface ItemProps {
        title: string;
        description: string;
        icon: string;
        link: string;
    }

    return <div className={styles.specials}></div>;
};

export default SpecialsSection;
