'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentProduct } from '@prisma/client';

import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/GetFormFields';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from '~/components/client/DeleteButton';

export const UpdatePaymentProduct = ({
    paymentProduct,
}: {
    paymentProduct?: PaymentProduct;
}) => {
    const router = useRouter();
    const formFields = getFormFields(paymentProduct);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        paymentProductID: string
    ) {
        event.preventDefault();
        setIsSubmitting(true);

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

                if (productFile && imageSignature && imageTimestamp) {
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

        setIsSubmitting(false);
    }

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={utils.updateIcon}
                    />
                </button>
                {paymentProduct && (
                    <DeleteButton
                        modelId={paymentProduct.id}
                        endpoint="account"
                        route="payments"
                    />
                )}
            </div>
            {isSubmitting ? (
                <Loading />
            ) : (
                <>
                    <FormDialog
                        visible={showForm}
                        onClose={() => setShowForm(false)}>
                        <form
                            className={utils.form}
                            onSubmit={event =>
                                paymentProduct &&
                                handleSubmit(event, paymentProduct.id)
                            }
                            encType="multipart/form-data">
                            <h1 className={utils.mainHeading}>
                                Payment Product Form
                            </h1>
                            {formFields.map(field => (
                                <div key={field.name}>
                                    <label htmlFor={field.name}>
                                        {field.label}
                                    </label>
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
                    </FormDialog>
                </>
            )}
        </section>
    );
};
