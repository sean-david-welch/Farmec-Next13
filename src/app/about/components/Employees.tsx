import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import Image from 'next/image';

import { prisma } from '~/lib/prisma';
import { UpdateAbout } from './UpdateAbout';
import { getSessionAndUser } from '~/utils/user';

export const Employees = async () => {
    const employees = await prisma.employee.findMany();
    const { user } = await getSessionAndUser();

    return (
        <section id="employees">
            <div className={styles.employees}>
                {employees.map(employee => (
                    <div className={styles.employeeCard} key={employee.id}>
                        <Image
                            src={employee.profile_image || '/default.jpg'}
                            alt={'/default.jpg'}
                            width={250}
                            height={250}
                        />
                        <div className={styles.employeeInfo}>
                            <h1 className={utils.mainHeading}>
                                {employee.name}
                            </h1>
                            <p className={utils.subHeading}>{employee.role}</p>
                        </div>
                        <div className={styles.employeeContact}>
                            <p className={utils.subHeading}>{employee.email}</p>
                            <p className={utils.subHeading}>{employee.phone}</p>
                        </div>
                        {user && user.role === 'ADMIN' && (
                            <UpdateAbout
                                modelName="employee"
                                model={employee}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};
