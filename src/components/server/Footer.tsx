import styles from '../styles/Footer.module.css';
import ToTopButton from '../client/ToTop';

import { FooterNav } from './FooterNav';
import { FooterLinks } from './FooterLinks';
import { FooterInfo } from './FooterInfo';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <FooterInfo />
            <FooterLinks />
            <FooterNav />
            <ToTopButton />
        </footer>
    );
};

export default Footer;
