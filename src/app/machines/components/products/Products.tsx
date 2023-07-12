import styles from '../../styles/Machines.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';
import { Machine } from '@prisma/client';

interface Props {
    machine: Machine;
}

const Products = async ({ machine }: Props) => {
    return <section id="products"></section>;
};

export default Products;
