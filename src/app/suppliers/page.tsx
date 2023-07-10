import styles from './styles/Suppliers.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import SupplierForm from './components/CreateSupplier';

import { prisma } from '~/lib/prisma';
import { Supplier } from '@prisma/client';
import { SocialLinks } from './components/SocialLinks';
import { getSessionAndUser } from '~/utils/user';

const Suppliers = async () => {
    const { user } = await getSessionAndUser();
    const suppliers: Supplier[] = await prisma.supplier.findMany();

    if (!suppliers) {
        return <div>loading...</div>;
    }

    return (
        <section id="suppliers">
            {suppliers.map(
                ({
                    id,
                    name,
                    logo_image,
                    marketing_image,
                    description,
                    social_facebook,
                    social_twitter,
                    social_instagram,
                    social_linkedin,
                    social_website,
                    social_youtube,
                }) => (
                    <div className={styles.supplierCard} key={id}>
                        <div className={styles.supplierGrid}>
                            <div className={styles.supplierHead}>
                                <h1 className={utils.mainHeading}>{name}</h1>
                                <Image
                                    src={logo_image || '/default.jpg'}
                                    alt={'/default.jpg'}
                                    className={styles.supplierLogo}
                                    width={200}
                                    height={200}
                                />

                                <SocialLinks
                                    facebook={social_facebook}
                                    twitter={social_twitter}
                                    instagram={social_instagram}
                                    linkedin={social_linkedin}
                                    website={social_website}
                                    youtube={social_youtube}
                                />
                            </div>
                            <Image
                                src={marketing_image || '/default.jpg'}
                                alt={'/default.jpg'}
                                className={styles.supplierImage}
                                width={550}
                                height={550}
                            />
                        </div>

                        <div className={styles.supplierInfo}>
                            <p className={styles.supplierDescription}>
                                {description}
                            </p>
                            <Link href={`/suppliers/${id}`}>
                                <button className={utils.btn}>
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            )}
            {user && user.role === 'ADMIN' && <SupplierForm />}
        </section>
    );
};

export default Suppliers;
