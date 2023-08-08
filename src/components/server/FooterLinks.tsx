import styles from '../styles/Footer.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Ftmta } from '../client/Ftmta';

export const FooterLinks = () => {
    return (
        <div className={styles.footerLinks}>
            <div className={styles.accreditation}>
                <h1 className={utils.mainHeading}>Accreditation</h1>
                <Link href={'https://ftmta.ie/'} target={'_blank'}>
                    <Ftmta />
                </Link>
            </div>
            <div className={styles.socialLinks}>
                <Link
                    className={styles.socials}
                    href={'https://www.facebook.com/FarmecIreland/'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    aria-label="Visit our Facebook page">
                    <FontAwesomeIcon icon={faFacebook} size={'2x'} />
                </Link>
                <Link
                    className={styles.socials}
                    href={'https://twitter.com/farmec1?lang=en'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    aria-label="Visit our Twiiter page">
                    <FontAwesomeIcon icon={faTwitter} size={'2x'} />
                </Link>
                <Link
                    className={styles.socials}
                    href={'https://twitter.com/farmec1?lang=en'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    aria-label="Visit our LinkedIn page">
                    <FontAwesomeIcon icon={faLinkedin} size={'2x'} />
                </Link>
            </div>
        </div>
    );
};
