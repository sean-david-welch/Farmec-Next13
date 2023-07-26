import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';
import Link from 'next/link';

import { prisma } from '~/lib/prisma';
import { MachineRegistration } from '@prisma/client';

import { CreateRegistration } from '~/app/services/components/CreateRegistration';

interface Props {
    user: { role: string };
}

export const Registrations = async ({ user }: Props) => {
    const registrations: MachineRegistration[] | null =
        await prisma.machineRegistration.findMany();

    if (!registrations) {
        return (
            <section id="registration">
                <div>No registration claims found.</div>
                {user && user.role === 'ADMIN' && <CreateRegistration />}
            </section>
        );
    }

    return (
        <section id="registration">
            <h1 className={utils.mainHeading}>Machine Registrations:</h1>

            {registrations.map(registration => (
                <div className={styles.warrantyView} key={registration.id}>
                    <h1 className={utils.paragraph}>
                        {registration.dealer_name}
                    </h1>
                    <button className={utils.btnForm}>
                        <Link
                            href={`/services/registration/${registration.id}`}>
                            View Registration
                        </Link>
                    </button>
                </div>
            ))}
            {user && user.role === 'ADMIN' && <CreateRegistration />}
        </section>
    );
};
