import styles from '../styles/Info.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
        icon: IconProp;
        link: string;
    }

    const SpecialItem: React.FC<ItemProps> = ({
        title,
        description,
        icon,
        link,
    }) => {
        return (
            <ul className={styles.specialList}>
                <Link href={link}>
                    <li className={styles.specialListItem}>
                        <FontAwesomeIcon
                            icon={icon}
                            className={utils.mainIcon}
                        />
                    </li>
                    <li className={styles.specialListItem}>{title}</li>
                    <li className={styles.specialListItem}>{description}</li>
                </Link>
            </ul>
        );
    };

    return (
        <div className={styles.infoSection}>
            <h1 className={utils.sectionHeading}>We Specialize In:</h1>
            <p className={utils.subHeading}>
                Farmec is Commited to Bringing Value for our Customers - These
                are our Specialitse:
            </p>
            <div className={styles.specials}>
                <SpecialItem
                    title="Quality Stock"
                    description="Farmec is committed to the importation and distribution of only quality brands of unique farm machinery. We guarantee that all our suppliers are committed to providing farmers with durable and superior stock"
                    icon={faTractor}
                    link="/suppliers"
                />
                <SpecialItem
                    title="Assemably"
                    description="Farmec have a team of qualified and experienced staff that ensure abundant care is taken during the assembly process; we make sure that a quality supply chain is maintained from manufacturer to customer"
                    icon={faToolbox}
                    link="/about"
                />
                <SpecialItem
                    title="Spare Parts"
                    description="Farmec offers a diverse and complete range of spare parts for all its machinery. Quality stock control and industry expertise ensures parts finds their way to you efficiently"
                    icon={faGears}
                    link="/spareparts"
                />
                <SpecialItem
                    title="Customer Service"
                    description="Farmec is a family run company, we make sure we extend the ethos of a small community to our customers. We build established relationships with our dealers that provide them and the farmers with extensive guidance"
                    icon={faUserPlus}
                    link="/about"
                />
            </div>
        </div>
    );
};

export default SpecialsSection;
