import styles from '../styles/Suppliers.module.css';
import utils from '~/styles/Utils.module.css';

import Image from 'next/image';
import Machines from '../components/Machines';

import { prisma } from '~/lib/prisma';
import { SupplierForm } from '../components/UpdateSupplier';
import { SocialLinks } from '../components/SocialLinks';
import { getSessionAndUser } from '~/utils/user';

interface Props {
    params: { id: string };
}

const SupplierDetail = async ({ params }: Props) => {
    const supplier = await prisma.supplier.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!supplier) {
        return <div>loading...</div>;
    }

    const { user } = await getSessionAndUser();
    const {
        name,
        marketing_image,
        description,
        social_facebook,
        social_instagram,
        social_linkedin,
        social_twitter,
        social_website,
        social_youtube,
    } = supplier;

    return (
        <section id="supplierDetail">
            <div className={styles.supplierHeading}>
                <h1 className={utils.sectionHeading}>{name}</h1>

                <SocialLinks
                    facebook={social_facebook}
                    twitter={social_twitter}
                    instagram={social_instagram}
                    linkedin={social_linkedin}
                    website={social_website}
                    youtube={social_youtube}
                />
            </div>

            <div className={utils.index}>
                <h1 className={utils.mainHeading}>Index:</h1>
                <h1 className={utils.subHeading}>Machinery</h1>
            </div>

            <div className={styles.supplierDetail}>
                <Image
                    src={marketing_image ?? '/default.jpg'}
                    alt={'/dafault.jpg'}
                    className={styles.supplierImage}
                    width={750}
                    height={750}
                />

                <p className={styles.supplierDescription}>{description}</p>
                {user && user.role === 'ADMIN' && (
                    <SupplierForm supplier={supplier} />
                )}
            </div>

            <Machines supplier={supplier} />
        </section>
    );
};

export default SupplierDetail;
