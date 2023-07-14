import styles from '../styles/Products.module.css';
import utils from '~/styles/Utils.module.css';

import Link from 'next/link';
import Image from 'next/image';

import { prisma } from '~/lib/prisma';
import { Machine, Product } from '@prisma/client';
import { getSessionAndUser } from '~/utils/user';

import ProductForm from './CreateProduct';
import UpdateProduct from './UpdateProduct';

interface Props {
    machine: Machine;
}

const Products = async ({ machine }: Props) => {
    const { id } = machine;
    const { user } = await getSessionAndUser();
    const products: Product[] = await prisma.product.findMany({
        where: {
            machineId: id,
        },
    });

    if (!products) {
        return <div>loading...</div>;
    }

    return (
        <section id="products">
            <div className={styles.productGrid}>
                {products.map(product => (
                    <div className={styles.productCard} key={product.id}>
                        <h1 className={utils.mainHeading}>{product.name}</h1>
                        <Link
                            href={product.product_link || '#'}
                            target="_blank">
                            <Image
                                src={product.product_image || '/default.jpg'}
                                alt={'/default.jpg'}
                                className={styles.productImage}
                                width={500}
                                height={500}
                            />
                        </Link>
                        <p className={utils.subHeading}>
                            {product.description}
                        </p>
                        {user && user.role === 'ADMIN' && (
                            <UpdateProduct product={product} />
                        )}
                    </div>
                ))}
            </div>
            {user && user.role === 'ADMIN' && <ProductForm />}
        </section>
    );
};

export default Products;
