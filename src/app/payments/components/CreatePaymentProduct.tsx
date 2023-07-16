'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/GetFormFields';

export const CreatePaymentProduct = () => {
    const router = useRouter();
    const formFields = getFormFields();
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const productFile = formData.get('image') as File;

        const body = {
            name: formData.get('name'),
            price: formData.get('price'),
            image: productFile ? productFile.name : null,
        };

        try {
            const response = await axios.post('/api/payment', body);

            if (response.status === 200) {
                const { imageSignature, imageTimestamp, folder } =
                    response.data;

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
            <button
                className={utils.btnForm}
                onClick={() => setShowForm(!showForm)}>
                Create Supplier
            </button>
            {showForm && (
                <form
                    className={utils.form}
                    onSubmit={handleSubmit}
                    encType="multipart/form-data">
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
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
