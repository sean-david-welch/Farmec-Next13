import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';
import { WarrantyClaim } from '@prisma/client';

import { CreateWarranty } from '~/app/warranty/components/CreateWarranty';

export const Warranty = async () => {
    const warranties: WarrantyClaim[] | null =
        await prisma.warrantyClaim.findMany();

    if (!warranties) {
        return (
            <section id="warranty">
                <div>No warranty claims found.</div>
                <CreateWarranty />
            </section>
        );
    }

    return (
        <section id="warranty">
            <div className={styles.warrantyView}>
                {warranties.map(warranty => (
                    <div key={warranty.id}>
                        <h1>{warranty.dealer}</h1>
                    </div>
                ))}
            </div>
            <CreateWarranty />
        </section>
    );
};
