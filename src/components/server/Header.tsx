import dynamic from 'next/dynamic';
import { getSessionAndUser } from '~/lib/utils';

const Navbar = dynamic(() => import('../client/Navbar'));

const Header = async () => {
    const { user, session } = await getSessionAndUser();

    if (!session) {
        return (
            <header>
                <Navbar />
            </header>
        );
    }
    return (
        <header>
            <Navbar user={user} />
        </header>
    );
};

export default Header;
