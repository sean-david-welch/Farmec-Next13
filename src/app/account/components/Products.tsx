import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';
import Image from 'next/image';

import { prisma } from '~/lib/prisma';

import CheckoutForm from '~/app/payments/components/checkoutForm';
import { CreatePaymentProduct } from '~/app/payments/components/CreatePaymentProduct';
import { PaymentProduct } from '@prisma/client';

export const Products = async () => {
    const product: PaymentProduct | null =
        await prisma.paymentProduct.findFirst();

    if (!product) {
        return (
            <section id="payment-product">
                <div>No products found.</div>
                <CreatePaymentProduct />
            </section>
        );
    }

    const { name, price, image } = product;

    return (
        <section id="payment-product">
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
            </div>

            <CreatePaymentProduct />
        </section>
    );
};
