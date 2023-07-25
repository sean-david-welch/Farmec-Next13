import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';
import Link from 'next/link';

import { prisma } from '~/lib/prisma';
import { WarrantyClaim } from '@prisma/client';
import { CreateWarranty } from '~/app/services/components/CreateWarranty';

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
            <h1 className={utils.mainHeading}>Warranty Claims:</h1>
            {warranties.map(warranty => (
                <div className={styles.warrantyView} key={warranty.id}>
                    <h1 className={utils.paragraph}>{warranty.dealer}</h1>
                    <button className={utils.btnForm}>
                        <Link href={`/services/warranty/${warranty.id}`}>
                            View Claim
                        </Link>
                    </button>
                </div>
            ))}
            {user && user.role === 'ADMIN' && <CreateWarranty />}
        </section>
    );
};
