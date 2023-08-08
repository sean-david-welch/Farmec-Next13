import styles from '../styles/Footer.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import ToTopButton from '../client/ToTop';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Ftmta } from '../client/Ftmta';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInfo}>
                <Link href={'/'}>
                    <Image
                        src={'/farmeclogo.png'}
                        alt="logo"
                        height={175}
                        width={175}
                    />
                </Link>
                <ul className={styles.companyInfo}>
                    <li className={styles.infoItem}>Farmec Ireland Ltd.</li>
                    <li className={styles.infoItem}>Clonross, Drumree</li>
                    <li className={styles.infoItem}>Co. Meath, A85 PK30</li>
                    <li className={styles.infoItem}>Tel: 01 - 8259289</li>
                    <li className={styles.infoItem}>Email: info@farmec.ie</li>
                    <li className={styles.infoItem}>
                        <Link href={'/about/policy'}>
                            Privacy Policy | Terms of Use
                        </Link>
                    </li>
                </ul>
            </div>
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
            <div className={styles.footerNav}>
                <ul className={styles.navLinks}>
                    <button className={utils.btn}>
                        <Link href={'/about'}>Home</Link>
                    </button>
                    <button className={utils.btn}>
                        <Link href={'/about'}>About</Link>
                    </button>
                    <button className={utils.btn}>
                        <Link href={'/suppliers'}>Suppliers</Link>
                    </button>
                    <button className={utils.btn}>
                        <Link href={'/spareparts'}>Spare Parts</Link>
                    </button>
                    <button className={utils.btn}>
                        <Link href={'/blog'}>Blog</Link>
                    </button>
                </ul>
            </div>
            <ToTopButton />
        </footer>
    );
};

export default Footer;
