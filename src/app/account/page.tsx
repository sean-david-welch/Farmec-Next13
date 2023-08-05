import utils from '~/styles/Utils.module.css';
import Users from './components/UsersAdmin';
import AccountSection from './components/AccountSection';

import { SignInButton } from '~/components/client/Buttons';
import { getSessionAndUser } from '~/utils/user';

import { Products } from './components/ProductsAdmin';
import { CarouselAdmin } from './components/CarouselAdmin';

const Account = async () => {
    const { user } = await getSessionAndUser();

    if (!user) {
        return (
            <section id="account">
                <div className={utils.login}>
                    <h1 className={utils.sectionHeading}>Account</h1>
                    <p className={utils.subHeading}>Not logged in</p>
                    <SignInButton />
                </div>
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
                <AccountSection
                    user={user}
                    links={[
                        { text: 'Warrany Claim', href: '#warranty' },
                        { text: 'Machine Registration', href: '#registration' },
                    ]}
                />
            )}
            {user.role === 'STAFF' && (
                <AccountSection
                    user={user}
                    links={[
                        { text: 'Warranty Claims', href: '#services' },
                        {
                            text: 'Machine Registrations',
                            href: '#services',
                        },
                    ]}
                />
            )}
            {user.role === 'ADMIN' && (
                <AccountSection
                    user={user}
                    links={[
                        { text: 'Warranty Claims', href: '#services' },
                        {
                            text: 'Machine Registrations',
                            href: '#services',
                        },
                        { text: 'Products', href: '#payment-product' },
                        { text: 'Carousel', href: '#carousel' },
                    ]}>
                    <Users />
                    <Products user={user} />
                    <CarouselAdmin user={user} />
                </AccountSection>
            )}
        </section>
    );
};

export default Account;
