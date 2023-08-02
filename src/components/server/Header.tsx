import styles from '../styles/Header.module.css';

import Navbar from '../client/Navbar';
import Sidebar from '../client/Sidebar';

import { prisma } from '~/lib/prisma';
import { NavList } from '../server/NavList';
import { getSessionAndUser } from '~/utils/user';

const Header = async () => {
    const { user, session } = await getSessionAndUser();
    const suppliers = await prisma.supplier.findMany();

    if (!session) {
        return (
            <header className={styles.header}>
                <Navbar>
                    <NavList suppliers={suppliers} />
                </Navbar>
                <Sidebar suppliers={suppliers} />
            </header>
        );
    }
    return (
        <header className={styles.header}>
            <Navbar>
                <NavList user={user} suppliers={suppliers} />
            </Navbar>
            <Sidebar user={user} suppliers={suppliers} />
        </header>
    );
};

export default Header;
