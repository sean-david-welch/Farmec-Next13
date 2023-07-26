import styles from './styles/Account.module.css';
import utils from '~/styles/Utils.module.css';
import Users from './components/UsersAdmin';
import Index from '~/components/server/Index';

import { getSessionAndUser } from '~/utils/user';
import { Products } from './components/ProductsAdmin';
import { Warranty } from './components/Warranty';
import { CarouselAdmin } from './components/CarouselAdmin';
import { SignInButton } from '~/components/client/Buttons';
import { Registrations } from './components/MachineRegistration';
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
                        page="account"
                        links={[
                            { text: 'Warrany Claim', href: '#form' },
                            { text: 'Machine Registration', href: '#form' },
                        ]}
                    />
                    <h1 className={utils.sectionHeading}>User Services:</h1>

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
                        page="account"
                        links={[
                            { text: 'Warranty Claims', href: '#warranty' },
                            {
                                text: 'Machine Registrations',
                                href: '#registration',
                            },
                        ]}
                    />
                    <h1 className={utils.sectionHeading}>Carousel:</h1>

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
                        page="account"
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
                    <h1 className={utils.sectionHeading}>Carousel:</h1>

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
