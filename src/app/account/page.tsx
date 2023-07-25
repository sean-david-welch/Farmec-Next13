import styles from './styles/Account.module.css';
import utils from '~/styles/Utils.module.css';
import Users from './components/Users';
import Index from '~/components/server/Index';

import { getSessionAndUser } from '~/utils/user';
import { Products } from './components/Products';
import { Warranty } from './components/Warranty';
import { CarouselAdmin } from './components/Carousel';
import { SignInButton } from '~/components/client/Buttons';
import { Registrations } from './components/Registration';
import { CreateWarranty } from '../services/components/CreateWarranty';
import { CreateRegistration } from '../services/components/CreateRegistration';

const Account = async () => {
    const { user } = await getSessionAndUser();

    if (!user) {
        return (
            <section id="account">
                <h1 className={utils.sectionHeading}>Account</h1>
                <p className={utils.subHeading}>Not logged in</p>
                <SignInButton />
            </section>
        );
    }

    return (
        <section id="account">
            <h1 className={utils.sectionHeading}>Account</h1>
            <p className={utils.subHeading}>
                Logged in as {user?.name} - {user?.role}
            </p>

            {user.role === 'USER' && (
                <div className={styles.accountMap}>
                    <Index
                        title="Account Navigation"
                        links={[
                            { text: 'Warrany Claim', href: '#form' },
                            { text: 'Machine Registration', href: '#form' },
                        ]}
                    />
                    <div className={styles.accountSection}>
                        <CreateWarranty />
                        <CreateRegistration />
                    </div>
                </div>
            )}

            {user.role === 'STAFF' && (
                <div className={styles.accountMap}>
                    <Index
                        title="Account Navigation"
                        links={[
                            { text: 'Warranty Claims', href: '#warranty' },
                            {
                                text: 'Machine Registrations',
                                href: '#registration',
                            },
                        ]}
                    />
                    <div className={styles.accountSection}>
                        <Warranty user={user} />
                        <Registrations user={user} />
                    </div>
                </div>
            )}

            {user.role === 'ADMIN' && (
                <div className={styles.accountMap}>
                    <Index
                        title="Account Navigation"
                        links={[
                            { text: 'Products', href: '#payment-products' },
                            { text: 'Carousel', href: '#carousel' },
                            { text: 'Warranty Claims', href: '#warranty' },
                            {
                                text: 'Machine Registrations',
                                href: '#registration',
                            },
                        ]}
                    />
                    <Products user={user} />
                    <CarouselAdmin user={user} />
                    <Users />
                    <div className={styles.accountSection}>
                        <Warranty user={user} />
                        <Registrations user={user} />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Account;
