import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Products from '~/app/products/components/Products';

import { prisma } from '~/lib/prisma';

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

    const { machine_link } = machine;

    return (
        <section id="machineDetai">
            <h1 className={utils.sectionHeading}>Products</h1>

            <div className={utils.index}>
                <h1 className={utils.sectionHeading}>Product Index:</h1>
                <h1 className={utils.subHeading}>Products</h1>
                <button className={utils.btnRound}>
                    <Link href={machine_link || '#'} target="_blank">
                        Supplier Website {'  '}
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                </button>
            </div>
            <Products machine={machine} />
        </section>
    );
};

export default MachineDetail;
