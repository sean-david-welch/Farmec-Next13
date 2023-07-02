import styles from '../styles/Header.module.css';

import Navbar from '../client/Navbar';
import { getSessionAndUser } from '~/lib/utils';

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
