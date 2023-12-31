import styles from '~/app/machines/styles/Machines.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import MachineForm from '~/app/machines/components/CreateMachine';
import UpdateMachine from '~/app/machines/components/UpdateMachine';

import { prisma } from '~/lib/prisma';
import { Machine, Supplier } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface Props {
    supplier: Supplier;
}

const Machines = async ({ supplier }: Props) => {
    const { id } = supplier;
    const { user } = await getSessionAndUser();
    const machines: Machine[] = await prisma.machine.findMany({
        where: {
            supplierId: id,
        },
    });

    if (!machines) {
        return <div>loading...</div>;
    }

    return (
        <section id="machines">
            <h1 className={utils.sectionHeading}>Machinery</h1>
            {user && user.role === 'ADMIN' && <MachineForm />}

            {machines.map(machine => (
                <div
                    className={styles.machineCard}
                    key={machine.id}
                    id={machine.name || ''}>
                    <div className={styles.machineGrid}>
                        <Image
                            src={machine.machine_image || '/default.jpg'}
                            alt={'/default.jpg'}
                            className={styles.machineImage}
                            width={600}
                            height={600}
                        />
                        <div className={styles.machineInfo}>
                            <h1 className={utils.mainHeading}>
                                {machine.name}
                            </h1>
                            <p className={utils.paragraph}>
                                {machine.description}
                            </p>
                            <button className={utils.btn}>
                                <Link href={`/machines/${machine.id}`}>
                                    View Products
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                    />
                                </Link>
                            </button>
                        </div>
                    </div>
                    {user && user.role === 'ADMIN' && (
                        <UpdateMachine machine={machine} />
                    )}
                </div>
            ))}
        </section>
    );
};

export default Machines;
