import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';

import CheckoutForm from '~/app/payments/components/checkoutForm';
import { CreatePaymentProduct } from '~/app/payments/components/CreatePaymentProduct';

export const Products = async () => {
    const product = await prisma.paymentProduct.findFirst();

    if (!product) {
        return (
            <section id="payment-product">
                <div>No products found.</div>
                <CreatePaymentProduct />
            </section>
        );
    }

    return (
        <section id="payment-product">
            <CheckoutForm product={product} />
            <CreatePaymentProduct />
        </section>
    );
};
