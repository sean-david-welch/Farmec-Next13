import styles from './styles/Spareparts.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import SparepartsForm from './components/CreateSparepart';

import { prisma } from '~/lib/prisma';
import { SpareParts, Supplier } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CreateWarranty } from '../services/components/CreateWarranty';
import { CreateRegistration } from '../services/components/CreateRegistration';

const SpareParts = async () => {
    const { user } = await getSessionAndUser();

    const suppliers: Supplier[] = await prisma.supplier.findMany();
    const spareparts: SpareParts[] = await prisma.spareParts.findMany({
        where: {
            supplierId: {
                in: suppliers.map(supplier => supplier.id),
            },
        },
    });

    if (!spareparts) {
        return <div>loading...</div>;
    }

    return (
        <section id="SpareParts">
            <h1 className={utils.sectionHeading}>Spare-Parts</h1>

            <div className={utils.index}>
                <h1 className={utils.mainHeading}>Suppliers</h1>
            </div>

            {suppliers.map(supplier => (
                <div className={styles.supplierCard} key={supplier.id}>
                    <h1 className={utils.mainHeading}>{supplier.name}</h1>
                    <Image
                        src={supplier.logo_image ?? '/default.jpg'}
                        alt="Supplier logo"
                        width={200}
                        height={200}
                    />
                    <button className={utils.btnRound}>
                        <Link href={`/spareparts/${supplier.id}`}>
                            Spare-Parts{' '}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </Link>
                    </button>
                </div>
            ))}
            {user && user.role === 'ADMIN' && <SparepartsForm />}
        </section>
    );
};

export default SpareParts;
