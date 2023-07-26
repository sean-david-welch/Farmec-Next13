import styles from '../styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

import Index from '~/components/server/Index';

interface Props {
    children?: React.ReactNode;
    links: { text: string; href: string }[];
    userServices: React.ReactNode;
}

const AccountSection = ({ children, links, userServices }: Props) => {
    return (
        <div className={styles.accountMap}>
            <Index title="Account Navigation" page="account" links={links} />
            <h1 className={utils.sectionHeading} id="#services">
                User Services:
            </h1>
            <div className={styles.accountSection}>{userServices}</div>
            {children}
        </div>
    );
};

export default AccountSection;
