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

            <div className={styles.userGrid}>
                {users.map(user => (
                    <div className={styles.userSection} key={user.id}>
                        <div className={styles.userCard}>
                            <h1 className={utils.paragraph}>
                                User: {user.name?.toUpperCase()}
                            </h1>
                            {user.email && (
                                <h1 className={utils.paragraph}>
                                    Email: {user.email}
                                </h1>
                            )}
                            <h1 className={utils.paragraph}>
                                Role: {user.role}
                            </h1>
                        </div>
                        <UpdateUser user={user} />
                    </div>
                ))}
            </div>

            <CreateUser />
        </section>
    );
};

export default Users;
