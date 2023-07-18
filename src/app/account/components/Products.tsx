import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';

import CheckoutForm from '~/app/payments/components/checkoutForm';
import { CreatePaymentProduct } from '~/app/payments/components/CreatePaymentProduct';
import { PaymentProduct } from '@prisma/client';

export const Products = async () => {
    const products: PaymentProduct[] = await prisma.paymentProduct.findMany();

    if (!products) {
        return (
            <section id="payment-product">
                <div>No products found.</div>
                <CreatePaymentProduct />
            </section>
        );
    }

    return (
        <section id="payment-product">
            {products.length > 0 && <CheckoutForm product={products[0]} />}
            <CreatePaymentProduct />
        </section>
    );
};
