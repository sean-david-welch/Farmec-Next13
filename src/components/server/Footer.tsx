import styles from '../styles/Footer.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
                        <Image
                            src={'/ftmta-logo.png'}
                            alt="logo"
                            height={175}
                            width={175}
                        />
                    </Link>
                </div>
                <div className={styles.socialLinks}>
                    <Link
                        href={'https://www.facebook.com/FarmecIreland/'}
                        target={'_blank'}>
                        <FontAwesomeIcon icon={faFacebook} height={50} />
                    </Link>
                    <Link
                        href={'https://twitter.com/farmec1?lang=en'}
                        target={'_blank'}>
                        <FontAwesomeIcon icon={faTwitter} height={50} />
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
        </footer>
    );
};

export default Footer;
