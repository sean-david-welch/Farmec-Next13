import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import Image from 'next/image';
import CheckoutForm from '~/app/payments/components/CheckoutForm';

import { prisma } from '~/lib/prisma';
import { PaymentProduct } from '@prisma/client';
import { CreatePaymentProduct } from '~/app/payments/components/CreatePaymentProduct';
import { UpdatePaymentProduct } from '~/app/payments/components/UpdatePaymentProduct';

interface Props {
    user: { role: string };
}

export const Products = async ({ user }: Props) => {
    const product: PaymentProduct | null =
        await prisma.paymentProduct.findFirst();

    if (!product) {
        return (
            <section id="payment-product">
                <div>No products found.</div>
                {user && user.role === 'ADMIN' && <CreatePaymentProduct />}
            </section>
        );
    }

    const { name, price, image } = product;

    return (
        <section id="payment-product">
            <h1 className={utils.sectionHeading}>Payment Products:</h1>

            <div className={styles.productView}>
                <h1 className={utils.mainHeading}>
                    {name} - €{price}
                </h1>
                <Image
                    src={image ?? '/default.jpg'}
                    alt={name ?? 'Default image'}
                    width={300}
                    height={300}
                />

                {product && <CheckoutForm product={product} />}
                {user && user.role === 'ADMIN' && (
                    <UpdatePaymentProduct paymentProduct={product} />
                )}
            </div>

            {user && user.role === 'ADMIN' && <CreatePaymentProduct />}
        </section>
    );
};
