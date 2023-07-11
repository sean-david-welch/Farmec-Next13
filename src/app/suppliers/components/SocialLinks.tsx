'use client';
import styles from '../styles/Suppliers.module.css';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTwitter,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface SocialLinksProps {
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    website?: string | null;
    youtube?: string | null;
}

export const SocialLinks = ({
    facebook,
    twitter,
    instagram,
    linkedin,
    website,
    youtube,
}: SocialLinksProps) => {
    return (
        <div className={styles.socialLinks}>
            {facebook && (
                <Link
                    href={facebook}
                    target="_blank"
                    className={styles.facebookButton}>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faFacebook}
                    />
                </Link>
            )}
            {twitter && (
                <Link
                    href={twitter}
                    target="_blank"
                    className={styles.twitterButton}>
                    <FontAwesomeIcon className={styles.icon} icon={faTwitter} />
                </Link>
            )}
            {instagram && (
                <Link
                    href={instagram}
                    target="_blank"
                    className={styles.instagramButton}>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faInstagram}
                    />
                </Link>
            )}
            {linkedin && (
                <Link
                    href={linkedin}
                    target="_blank"
                    className={styles.linkedinButton}>
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={faLinkedin}
                    />
                </Link>
            )}
            {website && (
                <Link
                    href={website}
                    target="_blank"
                    className={styles.websiteButton}>
                    <FontAwesomeIcon className={styles.icon} icon={faGlobe} />
                </Link>
            )}
            {youtube && (
                <Link
                    href={youtube}
                    target="_blank"
                    className={styles.youtubeButton}>
                    <FontAwesomeIcon className={styles.icon} icon={faYoutube} />
                </Link>
            )}
        </div>
    );
};
