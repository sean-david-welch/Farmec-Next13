import Navbar from '../client/Navbar';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';

const Header = async () => {
    const { user, session } = await getSessionAndUser();
    const suppliers = await prisma.supplier.findMany();

    if (!session) {
        return (
            <header>
                <Navbar suppliers={suppliers} />
            </header>
        );
    }
    return (
        <header>
            <Navbar user={user} suppliers={suppliers} />
        </header>
    );
};

export default Header;
