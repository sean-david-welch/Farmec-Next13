import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Index from '~/components/server/Index';
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
        include: {
            products: true,
        },
    });

    if (!machine) {
        return <div>loading...</div>;
    }

    const { machine_link, products } = machine;

    return (
        <section id="machineDetai">
            <h1 className={utils.sectionHeading}>Products</h1>

            <Index
                title="Product Index"
                links={products
                    .filter(product => product.name !== null)
                    .map(product => ({
                        text: product.name!,
                        href: `#${product.name}`,
                    }))}>
                <button className={utils.btnRound}>
                    <Link href={machine_link || '#'} target="_blank">
                        Supplier Website {'  '}
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                </button>
            </Index>
            <Products machine={machine} />
        </section>
    );
};

export default MachineDetail;
