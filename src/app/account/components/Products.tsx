import { prisma } from '~/lib/prisma';

import CheckoutForm from '~/app/payments/components/checkoutForm';

export const Products = async () => {
    const product = await prisma.paymentProduct.findFirst();

    if (!product) {
        return <div>No products found.</div>;
    }

    return <CheckoutForm product={product} />;
};
