import styles from '../styles/Machines.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Products from '../components/products/Products';

import { prisma } from '~/lib/prisma';

import { getSessionAndUser } from '~/utils/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface Props {
    params: { id: string };
}

const MachineDetail = async ({ params }: Props) => {
    const machine = await prisma.machine.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!machine) {
        return <div>loading...</div>;
    }

    const { user } = await getSessionAndUser();

    const { machine_link } = machine;

    return (
        <section id="machineDetai">
            <div className={utils.index}>
                <h1 className={utils.mainHeading}>Product Index:</h1>
                <h1 className={utils.subHeading}>Products</h1>
                <button>
                    <button className={utils.btnRound}>
                        <Link href={machine_link || '#'} target="_blank">
                            Supplier Website {'  '}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </Link>
                    </button>
                </button>
            </div>
            <Products machine={machine} />
        </section>
    );
};

export default MachineDetail;
