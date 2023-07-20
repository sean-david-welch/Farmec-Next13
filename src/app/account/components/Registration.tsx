import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';
import { MachineRegistration } from '@prisma/client';

import { CreateRegistration } from '~/app/warranty/components/CreateRegistration';
import { UpdateRegistration } from '~/app/warranty/components/UpdateRegistration';

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
            <div className={styles.warrantyView}>
                {registrations.map(registration => (
                    <div key={registration.id}>
                        <h1>{registration.dealer_name}</h1>
                        {user && user.role === 'ADMIN' && (
                            <UpdateRegistration registration={registration} />
                        )}
                    </div>
                ))}
            </div>
            {user && user.role === 'ADMIN' && <CreateRegistration />}
        </section>
    );
};
