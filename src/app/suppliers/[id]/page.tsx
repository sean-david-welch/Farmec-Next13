import styles from '../styles/Suppliers.module.css';
import utils from '~/styles/Utils.module.css';

import Image from 'next/image';
import Index from '~/components/server/Index';
import Machines from '../components/Machines';

import { prisma } from '~/lib/prisma';
import { SupplierForm } from '../components/UpdateSupplier';
import { SocialLinks } from '../components/SocialLinks';
import { getSessionAndUser } from '~/utils/user';
import Videos from '../components/Videos';

interface Props {
    params: { id: string };
}

const SupplierDetail = async ({ params }: Props) => {
    const supplier = await prisma.supplier.findUnique({
        where: {
            id: params.id,
        },
        include: {
            machines: true,
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
        machines,
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

            <Index
                title="Machinery List:"
                links={machines
                    .filter(machine => machine.name !== null)
                    .map(machine => ({
                        text: machine.name!,
                        href: `#${machine.name}`,
                    }))}
            />

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
            <Videos supplier={supplier} />
        </section>
    );
};

export default SupplierDetail;
