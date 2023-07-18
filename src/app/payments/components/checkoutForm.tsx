'use client';
import axios from 'axios';
import utils from '~/styles/Utils.module.css';

import { PaymentProduct } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Props {
    product: PaymentProduct;
}

const CheckoutForm = ({ product }: Props) => {
    const router = useRouter();
    const handlePayment = async (
        event: React.FormEvent<HTMLFormElement>,
        product: PaymentProduct
    ) => {
        event.preventDefault();
        const body = {
            id: product.id,
            price: product.price,
        };

        try {
            const response = await axios.post('/api/checkout', body);
            const {
                data: { url },
            } = response;

            if (!url) {
                console.log('Stripe session creation failed.');
                return;
            }

            router.push(url);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={event => handlePayment(event, product)}>
            <button className={utils.btnForm} role="link" type="submit">
                Buy Now
            </button>
        </form>
    );
};

export default CheckoutForm;
