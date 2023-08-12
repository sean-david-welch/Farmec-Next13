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
            <Link href={link}>
                <ul className={styles.statList}>
                    <li className={styles.statListItem}>{title}</li>
                    <li className={styles.statListItem}>
                        <FontAwesomeIcon
                            icon={icon}
                            className={utils.mainIcon}
                            size="3x"
                        />
                    </li>
                    <li className={styles.statListItem}>{description}</li>
                </ul>
            </Link>
        );
    };

    return (
        <div className={styles.infoSection}>
            <h1 className={utils.sectionHeading}>Farmec At A Glance:</h1>
            <p className={utils.subHeading}>
                This is a Quick Look at what Separates us from our Competitors
            </p>
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
        </div>
    );
};

export default StatsSection;
