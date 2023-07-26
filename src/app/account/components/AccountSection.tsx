import styles from '../styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

import Index from '~/components/server/Index';
import UserServices from './UserServices';

import { Warranty } from './Warranty';
import { Registrations } from './MachineRegistration';

import { CreateWarranty } from '~/app/services/components/CreateWarranty';
import { CreateRegistration } from '~/app/services/components/CreateRegistration';

interface Props {
    user: { role: string };
    children?: React.ReactNode;
    links: { text: string; href: string }[];
}

const AccountSection = ({ user, children, links }: Props) => {
    return (
        <div className={styles.accountMap}>
            <Index title="Account Navigation" page="account" links={links} />
            <UserServices>
                {user.role === 'USER' && (
                    <>
                        <div className={styles.userServices}>
                            <h1 className={utils.mainHeading} id="warranty">
                                Warranty Claim
                            </h1>
                            <CreateWarranty />
                        </div>
                        <div className={styles.userServices} id="registration">
                            <h1 className={utils.mainHeading}>
                                Machine Registration
                            </h1>

                            <CreateRegistration />
                        </div>
                    </>
                )}
                {user.role === 'STAFF' ||
                    (user.role === 'ADMIN' && (
                        <div className={styles.accountSection}>
                            <Warranty user={user} />
                            <Registrations user={user} />
                        </div>
                    ))}
            </UserServices>
            {children}
        </div>
    );
};

export default AccountSection;
