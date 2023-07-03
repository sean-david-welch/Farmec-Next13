'use client';
import styles from '../styles/Info.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
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
        icon: IconProp;
        link: string;
    }

    const StatsItem: React.FC<ItemProps> = ({
        title,
        description,
        icon,
        link,
    }) => {
        return (
            <ul className={styles.statList}>
                <Link href={link}>
                    <li className={styles.statListItem}>{title}</li>
                    <li className={styles.statListItem}>{description}</li>
                    <li className={styles.statListItem}>
                        <FontAwesomeIcon icon={icon} size={'4x'} />
                    </li>
                </Link>
            </ul>
        );
    };

    return (
        <div className={styles.stats}>
            <StatsItem
                title="Large Network"
                description="50+ Dealers Nationwide"
                icon={faUsers}
                link="/about"
            />
            <StatsItem
                title="Experience"
                description="25+ Years in Business"
                icon={faBusinessTime}
                link="/about"
            />
            <StatsItem
                title="Diverse Range"
                description="10+ Quality Suppliers"
                icon={faHandshake}
                link="/about"
            />
            <StatsItem
                title="Committment"
                description="Warranty Gaurentee"
                icon={faWrench}
                link="/about"
            />
        </div>
    );
};

export default StatsSection;
