import utils from '~/styles/Utils.module.css';
import styles from '~/app/account/styles/Account.module.css';

import Image from 'next/image';
import CheckoutForm from '~/app/payments/components/StripeCheckout';

import { prisma } from '~/lib/prisma';
import { PaymentProduct } from '@prisma/client';

const Payments = async () => {
    const product: PaymentProduct | null =
        await prisma.paymentProduct.findFirst();

    if (!product) {
        return (
            <section id="payment-product">
                <div>No products found.</div>
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
            </div>
        </section>
    );
};

export default Payments;
