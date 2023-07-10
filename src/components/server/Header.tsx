import Navbar from '../client/Navbar';

import { prisma } from '~/lib/prisma';
import { NavList } from '../server/NavList';
import { getSessionAndUser } from '~/utils/user';

const Header = async () => {
    const { user, session } = await getSessionAndUser();
    const suppliers = await prisma.supplier.findMany();

    if (!session) {
        return (
            <header>
                <Navbar>
                    <NavList suppliers={suppliers} />
                </Navbar>
            </header>
        );
    }
    return (
        <header>
            <Navbar>
                <NavList user={user} suppliers={suppliers} />
            </Navbar>
        </header>
    );
};

export default Header;
