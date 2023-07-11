import styles from '~/app/machines/styles/Machines.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import MachineForm from '~/app/machines/components/CreateMachine';
import UpdateMachine from '~/app/machines/components/UpdateMachine';

import { prisma } from '~/lib/prisma';
import { Machine, Supplier } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';

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
            {machines.map(machine => (
                <div className={styles.machineCard} key={machine.id}>
                    <div className={styles.machineGrid}>
                        <h1 className={utils.mainHeading}>{machine.name}</h1>
                        <Image
                            src={machine.machine_image || '/default.jpg'}
                            alt={'/default.jpg'}
                            className={styles.machineImage}
                            width={200}
                            height={200}
                        />
                        <p>{machine.description}</p>
                        <Link
                            href={machine.machine_link || '#'}
                            target={'_blank'}>
                            Link
                        </Link>
                    </div>
                    {user && user.role === 'ADMIN' && (
                        <UpdateMachine machine={machine} />
                    )}
                </div>
            ))}
            {user && user.role === 'ADMIN' && <MachineForm />}
        </section>
    );
};

export default Machines;
