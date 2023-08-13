import styles from './styles/Suppliers.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import Index from '~/components/server/Index';
import SupplierForm from './components/CreateSupplier';

import { prisma } from '~/lib/prisma';
import { Supplier } from '@prisma/client';
import { SocialLinks } from './components/SocialLinks';
import { getSessionAndUser } from '~/utils/user';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UpdateSupplier } from './components/UpdateSupplier';

const Suppliers = async () => {
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
        <section id="suppliers">
            <h1 className={utils.sectionHeading}>Suppliers</h1>

            <Index
                title="Supplier Navigation"
                links={suppliers
                    .filter(supplier => supplier.name !== null)
                    .map(supplier => ({
                        text: supplier.name!,
                        href: `#${supplier.name}`,
                    }))}
            />
            {suppliers.map(supplier => (
                <div
                    className={styles.supplierCard}
                    key={supplier.id}
                    id={supplier.name || ''}>
                    <div className={styles.supplierGrid}>
                        <div className={styles.supplierHead}>
                            <h1 className={utils.mainHeading}>
                                {supplier.name}
                            </h1>
                            <Image
                                src={supplier.logo_image || '/default.jpg'}
                                alt={'/default.jpg'}
                                className={styles.supplierLogo}
                                width={200}
                                height={200}
                            />

                            <SocialLinks
                                facebook={supplier.social_facebook}
                                twitter={supplier.social_twitter}
                                instagram={supplier.social_instagram}
                                linkedin={supplier.social_linkedin}
                                website={supplier.social_website}
                                youtube={supplier.social_youtube}
                            />
                        </div>
                        <Image
                            src={supplier.marketing_image || '/default.jpg'}
                            alt={'/default.jpg'}
                            className={styles.supplierImage}
                            width={550}
                            height={550}
                        />
                    </div>

                    <div className={styles.supplierInfo}>
                        <p className={styles.supplierDescription}>
                            {supplier.description}
                        </p>
                        <button className={utils.btn}>
                            <Link href={`/suppliers/${supplier.id}`}>
                                Learn More
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </Link>
                        </button>
                    </div>
                    {user && user.role === 'ADMIN' && (
                        <UpdateSupplier supplier={supplier} />
                    )}
                </div>
            ))}
            {user && user.role === 'ADMIN' && <SupplierForm />}
        </section>
    );
};

export default Suppliers;
