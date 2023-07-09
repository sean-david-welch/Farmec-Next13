import Navbar from './Navbar';

import { getSessionAndUser } from '~/utils/user';

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
