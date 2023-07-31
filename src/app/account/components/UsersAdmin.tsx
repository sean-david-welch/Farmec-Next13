import styles from '../styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';
import { CreateUser } from './CreateUser';
import { UpdateUser } from './UpdateUser';

const Users = async () => {
    const users = await prisma.user.findMany();

    return (
        <section id="users">
            <h1 className={utils.sectionHeading}>Users</h1>

            {users.map(user => (
                <div className={styles.userSection} key={user.id}>
                    <div className={styles.userCard}>
                        <h1 className={utils.paragraph}> {user.name}</h1>
                        <h1 className={utils.paragraph}> {user.email}</h1>
                        <h1 className={utils.paragraph}>Role: {user.role}</h1>
                    </div>
                    <UpdateUser user={user} />
                </div>
            ))}

            <CreateUser />
        </section>
    );
};

export default Users;
