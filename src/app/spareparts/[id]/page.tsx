import styles from '../styles/Spareparts.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import Index from '~/components/server/Index';

import { prisma } from '~/lib/prisma';
import { SpareParts } from '@prisma/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import UpdatePartForm from '../components/UpdateSparepart';
import SparepartsForm from '../components/CreateSparepart';
import { getSessionAndUser } from '~/utils/user';

interface Props {
    params: { id: string };
}

const PartsDetail = async ({ params }: Props) => {
    const { user } = await getSessionAndUser();
    const spareparts: SpareParts[] = await prisma.spareParts.findMany({
        where: {
            supplierId: params.id,
        },
    });

    return (
        <section id="partsDetail">
            <h1 className={utils.sectionHeading}>Parts Catalogues</h1>

            <Index
                title="Supplier Navigation"
                links={spareparts
                    .filter(sparepart => sparepart.name !== null)
                    .map(sparepart => ({
                        text: sparepart.name!,
                        href: `#${sparepart.name}`,
                    }))}
            />

            {spareparts.map(sparepart => (
                <div className={styles.sparepartGrid} key={sparepart.id}>
                    <div
                        className={styles.sparepartsCard}
                        id={sparepart.name || ''}>
                        <div className={styles.sparepartsGrid}>
                            <div className={styles.sparepartsInfo}>
                                <h1 className={utils.mainHeading}>
                                    {sparepart.name}
                                </h1>
                                <button className={utils.btnRound}>
                                    <Link
                                        href={
                                            sparepart.spare_parts_link ||
                                            sparepart.pdf_link ||
                                            '#'
                                        }
                                        target="_blank">
                                        Parts Catalogue
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                        />
                                    </Link>
                                </button>
                            </div>
                            <Image
                                src={sparepart.parts_image || '/default.jpg'}
                                alt={'/default.jpg'}
                                className={styles.sparepartsLogo}
                                width={600}
                                height={600}
                            />
                        </div>
                    </div>
                    {user && user.role === 'ADMIN' && (
                        <UpdatePartForm sparepart={sparepart} />
                    )}
                </div>
            ))}
            {user && user.role === 'ADMIN' && <SparepartsForm />}
        </section>
    );
};

export default PartsDetail;
