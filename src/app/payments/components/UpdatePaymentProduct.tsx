'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentProduct } from '@prisma/client';

import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/GetFormFields';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from './DeletePaymentProduct';

export const UpdatePaymentProduct = ({
    paymentProduct,
}: {
    paymentProduct?: PaymentProduct;
}) => {
    const router = useRouter();
    const formFields = getFormFields(paymentProduct);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        paymentProductID: string
    ) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const productFile = formData.get('image') as File;

        const body = {
            name: formData.get('name'),
            price: formData.get('price'),
            image: productFile ? productFile.name : null,
        };

        try {
            const response = await axios.put(
                `/api/payments/${paymentProductID}`,
                body
            );

            if (response.status === 200) {
                const { imageSignature, imageTimestamp, folder } =
                    response.data;

                const productFile = formData.get('image') as File;

                if (productFile) {
                    await uploadImage(
                        productFile,
                        imageSignature,
                        imageTimestamp,
                        productFile.name,
                        folder
                    );
                }
            }
        } catch (error) {
            console.error(error);
        }
        setShowForm(false);
        router.refresh();
    }

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {paymentProduct && (
                    <DeleteButton productId={paymentProduct.id} />
                )}
            </div>
            {showForm && (
                <form
                    className={utils.formSmall}
                    onSubmit={event =>
                        paymentProduct && handleSubmit(event, paymentProduct.id)
                    }
                    encType="multipart/form-data">
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue || ''}
                            />
                        </div>
                    ))}
                    <button className={utils.btnForm} type="submit">
                        Submit
                    </button>
                </form>
            )}
        </section>
    );
};
