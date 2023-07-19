import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import Image from 'next/image';
import CheckoutForm from '~/app/payments/components/checkoutForm';

import { prisma } from '~/lib/prisma';
import { PaymentProduct } from '@prisma/client';
import { CreatePaymentProduct } from '~/app/payments/components/CreatePaymentProduct';

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
