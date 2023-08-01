import styles from '../../styles/Services.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';
import { UpdateWarranty } from '../../components/UpdateWarranty';
import { DownloadLink } from '../../components/WarrantyPdf';

interface Props {
    params: { id: string };
}

const WarrantyDetail = async ({ params }: Props) => {
    const { user } = await getSessionAndUser();

    const warranty = await prisma.warrantyClaim.findUnique({
        where: { id: params.id },
    });

    const parts = await prisma.partsRequired.findMany({
        where: { warrantyId: params.id },
    });

    if (!warranty || !parts) {
        return (
            <section id="warranty-detail">
                <div>Warranty claim not found</div>
            </section>
        );
    }

    return (
        <section id="warranty-detail">
            <h1 className={utils.sectionHeading}>
                Warranty Claim: {warranty.dealer} - {warranty.owner_name}
            </h1>

            <div className={styles.warrantyDetail}>
                {Object.entries(warranty).map(([key, value]) => {
                    if (key !== 'id' && key !== 'created' && key !== 'parts') {
                        return (
                            <div className={styles.warrantyGrid} key={key}>
                                <div className={styles.label}>{key}</div>
                                <div className={styles.value}>
                                    {String(value)}
                                </div>
                            </div>
                        );
                    }
                })}
                {parts.map((part, index) =>
                    Object.entries(part).map(([key, value]) => {
                        if (key !== 'id' && key !== 'warrantyId') {
                            return (
                                <div
                                    className={styles.warrantyGrid}
                                    key={key + index}>
                                    <div className={styles.label}>{key}</div>
                                    <div className={styles.value}>
                                        {String(value)}
                                    </div>
                                </div>
                            );
                        }
                    })
                )}

                {user && user.role === 'ADMIN' && (
                    <UpdateWarranty
                        warrantyClaim={warranty}
                        partsRequired={parts}
                    />
                )}
            </div>

            <DownloadLink warranty={warranty} parts={parts} />
        </section>
    );
};

export default WarrantyDetail;
