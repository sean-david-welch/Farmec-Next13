import styles from '../styles/Spareparts.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import Index from '~/components/server/Index';

import { prisma } from '~/lib/prisma';
import { SpareParts } from '@prisma/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface Props {
    params: { id: string };
}

const PartsDetail = async ({ params }: Props) => {
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
            {spareparts.map(({ id, name, parts_image, spare_parts_link }) => (
                <div className={styles.sparepartsCard} key={id} id={name || ''}>
                    <div className={styles.sparepartsGrid}>
                        <div className={styles.sparepartsInfo}>
                            <h1 className={utils.mainHeading}>{name}</h1>
                            <button className={utils.btnRound}>
                                <Link
                                    href={spare_parts_link || '#'}
                                    target="_blank">
                                    Parts Catalogue
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                    />
                                </Link>
                            </button>
                        </div>

                        <Image
                            src={parts_image || '/default.jpg'}
                            alt={'/default.jpg'}
                            className={styles.sparepartsLogo}
                            width={600}
                            height={600}
                        />
                    </div>
                </div>
            ))}
        </section>
    );
};

export default PartsDetail;
