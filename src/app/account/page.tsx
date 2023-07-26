import utils from '~/styles/Utils.module.css';
import Users from './components/UsersAdmin';
import AccountSection from './components/AccountSection';

import { SignInButton } from '~/components/client/Buttons';
import { getSessionAndUser } from '~/utils/user';

import { Products } from './components/ProductsAdmin';
import { Warranty } from './components/Warranty';
import { CarouselAdmin } from './components/CarouselAdmin';
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
                <AccountSection
                    links={[
                        { text: 'Warrany Claim', href: '#form' },
                        { text: 'Machine Registration', href: '#form' },
                    ]}
                    userServices={
                        <>
                            <CreateWarranty />
                            <CreateRegistration />
                        </>
                    }
                />
            )}
            {user.role === 'STAFF' && (
                <AccountSection
                    links={[
                        { text: 'Warranty Claims', href: '#services' },
                        {
                            text: 'Machine Registrations',
                            href: '#services',
                        },
                    ]}
                    userServices={
                        <>
                            <Warranty user={user} />
                            <Registrations user={user} />
                        </>
                    }
                />
            )}
            {user.role === 'ADMIN' && (
                <AccountSection
                    links={[
                        { text: 'Warranty Claims', href: '#services' },
                        {
                            text: 'Machine Registrations',
                            href: '#services',
                        },
                        { text: 'Products', href: '#payment-product' },
                        { text: 'Carousel', href: '#carousel' },
                    ]}
                    userServices={
                        <>
                            <Warranty user={user} />
                            <Registrations user={user} />
                        </>
                    }
                    children={
                        <>
                            <Users />
                            <Products user={user} />
                            <CarouselAdmin user={user} />
                        </>
                    }
                />
            )}
        </section>
    );
};

export default Account;
