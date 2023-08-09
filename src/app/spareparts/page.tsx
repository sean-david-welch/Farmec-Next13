import styles from './styles/Spareparts.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import Index from '~/components/server/Index';
import SparePartsForm from './components/CreateSparepart';

import { prisma } from '~/lib/prisma';
import { Supplier } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const SpareParts = async () => {
    const { user } = await getSessionAndUser();

    const suppliers: Supplier[] = await prisma.supplier.findMany({
        orderBy: {
            created: 'asc',
        },
    });

    if (!suppliers) {
        return <div>loading...</div>;
    }

    return (
        <section id="SpareParts">
            <h1 className={utils.sectionHeading}>Spare-Parts</h1>

            <Index
                title="Supplier Navigation"
                links={suppliers
                    .filter(supplier => supplier.name !== null)
                    .map(supplier => ({
                        text: supplier.name!,
                        href: `/spareparts/${supplier.id}`,
                    }))}
            />
            {suppliers.map(supplier => (
                <div className={styles.supplierCard} key={supplier.id}>
                    <h1 className={utils.mainHeading}>{supplier.name}</h1>
                    <Image
                        src={supplier.logo_image ?? '/default.jpg'}
                        alt="Supplier logo"
                        width={200}
                        height={200}
                    />
                    <button className={utils.btn}>
                        <Link href={`/spareparts/${supplier.id}`}>
                            Spare-Parts
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </Link>
                    </button>
                </div>
            ))}
            {user && user.role === 'ADMIN' && <SparePartsForm />}
        </section>
    );
};

export default SpareParts;
