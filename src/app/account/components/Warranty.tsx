import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';
import { WarrantyClaim } from '@prisma/client';

import { CreateWarranty } from '~/app/warranty/components/CreateWarranty';
import { UpdateWarranty } from '~/app/warranty/components/UpdateWarranty';

interface Props {
    user: { role: string };
}

export const Warranty = async ({ user }: Props) => {
    const warranties: WarrantyClaim[] | null =
        await prisma.warrantyClaim.findMany();

    if (!warranties) {
        return (
            <section id="warranty">
                <div>No warranty claims found.</div>
                {user && user.role === 'ADMIN' && <CreateWarranty />}
            </section>
        );
    }

    return (
        <section id="warranty">
            <div className={styles.warrantyView}>
                {warranties.map(warranty => (
                    <div key={warranty.id}>
                        <h1>{warranty.dealer}</h1>
                        {user && user.role === 'ADMIN' && (
                            <UpdateWarranty warrantyClaim={warranty} />
                        )}
                    </div>
                ))}
            </div>
            {user && user.role === 'ADMIN' && <CreateWarranty />}
        </section>
    );
};
