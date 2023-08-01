import styles from '../../styles/Services.module.css';
import utils from '~/styles/Utils.module.css';

import { prisma } from '~/lib/prisma';
import { getSessionAndUser } from '~/utils/user';
import { UpdateRegistration } from '../../components/UpdateRegistration';
import { DownloadLink } from '../../components/RegistrationPdf';

interface Props {
    params: { id: string };
}

const WarrantyDetail = async ({ params }: Props) => {
    const { user } = await getSessionAndUser();

    const registration = await prisma.machineRegistration.findUnique({
        where: { id: params.id },
    });

    if (!registration) {
        return (
            <section id="warranty-detail">
                <div>Warranty claim not found</div>
            </section>
        );
    }

    return (
        <section id="warranty-detail">
            <h1 className={utils.sectionHeading}>
                Machine Registration: {registration.dealer_name} -{' '}
                {registration.owner_name}
            </h1>

            <div className={styles.warrantyDetail}>
                {Object.entries(registration).map(([key, value]) => {
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

                {user && user.role === 'ADMIN' && (
                    <UpdateRegistration registration={registration} />
                )}
            </div>

            <DownloadLink registration={registration} />
        </section>
    );
};

export default WarrantyDetail;
