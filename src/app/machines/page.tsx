import styles from './styles/Machines.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '~/lib/prisma';
import { Machine } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';
import MachineForm from './components/CreateMachine';

const Machines = async () => {
    const { user } = await getSessionAndUser();
    const machines: Machine[] = await prisma.machine.findMany();

    if (!machines) {
        return <div>loading...</div>;
    }

    return (
        <section id="machines">
            {machines.map(
                ({ id, name, machine_image, description, machine_link }) => (
                    <div className={styles.machineCard} key={id}>
                        <div className={styles.machineGrid}>
                            <h1 className={utils.mainHeading}>{name}</h1>
                            <Image
                                src={machine_image || '/default.jpg'}
                                alt={'/default.jpg'}
                                className={styles.machineImage}
                                width={200}
                                height={200}
                            />
                            <p>{description}</p>
                            <Link href={machine_link || '#'} target={'_blank'}>
                                Link
                            </Link>
                        </div>
                    </div>
                )
            )}
            {user && user.role === 'ADMIN' && <MachineForm />}
        </section>
    );
};

export default Machines;
