import styles from '../styles/Account.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';

const Users = async () => {
    const users = await prisma.user.findMany();

    return (
        <section id="users">
            <h1 className={utils.sectionHeading}>Users</h1>

            {users.map(user => (
                <div className={styles.userCard} key={user.id}>
                    <h1 className={utils.paragraph}> {user.name}</h1>
                    <h1 className={utils.paragraph}> {user.email}</h1>
                    <h1 className={utils.paragraph}>Role: {user.role}</h1>
                </div>
            ))}
        </section>
    );
};

export default Users;
