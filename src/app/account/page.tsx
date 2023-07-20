import styles from './styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

import { getSessionAndUser } from '~/utils/user';
import { Products } from './components/Products';
import { Warranty } from './components/Warranty';
import { CarouselAdmin } from './components/Carousel';

const Account = async () => {
    const { user } = await getSessionAndUser();

    if (!user) {
        return (
            <section id="account">
                <h1 className={utils.sectionHeading}>Account</h1>
                <p className={utils.subHeading}>Not logged in</p>
            </section>
        );
    }
    {
        if (user.role === 'ADMIN') {
            <section id="account">
                <h1 className={utils.sectionHeading}>Account</h1>
                <p className={utils.subHeading}>
                    Logged in as {user?.name} - {user?.role}
                </p>
            </section>;
        }
    }

    return (
        <section id="account">
            <h1 className={utils.sectionHeading}>Account</h1>
            <p className={utils.subHeading}>
                Logged in as {user?.name} - {user?.role}
            </p>
            {user.role === 'STAFF' && (
                <div className={styles.accountSection}>
                    <Products user={user} />
                    <Warranty user={user} />
                </div>
            )}
            {user.role === 'ADMIN' && (
                <div className={styles.accountSection}>
                    <Products user={user} />
                    <Warranty user={user} />
                    <CarouselAdmin user={user} />
                </div>
            )}
        </section>
    );
};

export default Account;
