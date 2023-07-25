import styles from './styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

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
                <div className={styles.accountSection}>
                    <CreateWarranty />
                    <CreateRegistration />
                </div>
            )}
            {user.role === 'STAFF' && (
                <div className={styles.accountSection}>
                    <Warranty user={user} />
                    <Registrations user={user} />
                </div>
            )}
            {user.role === 'ADMIN' && (
                <div className={styles.accountSection}>
                    <Products user={user} />
                    <CarouselAdmin user={user} />
                    <Warranty user={user} />
                    <Registrations user={user} />
                </div>
            )}
        </section>
    );
};

export default Account;
