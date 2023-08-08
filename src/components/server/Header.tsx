import styles from '../styles/Header.module.css';

import Navbar from '../client/Navbar';
import Sidebar from '../client/Sidebar';

import { prisma } from '~/lib/prisma';
import { NavList } from '../server/NavList';
import { getSessionAndUser } from '~/utils/user';

const Header = async () => {
    const { user, session } = await getSessionAndUser();
    const suppliers = await prisma.supplier.findMany({
        orderBy: {
            created: 'asc',
        },
    });

    if (!session) {
        return (
            <header className={styles.header}>
                <Navbar>
                    <NavList suppliers={suppliers} />
                </Navbar>
                <Sidebar />
            </header>
        );
    }
    return (
        <header className={styles.header}>
            <Navbar>
                <NavList user={user} suppliers={suppliers} />
            </Navbar>
            <Sidebar user={user} />
        </header>
    );
};

export default Header;
