'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';

export const CreateCarousel = () => {
    const router = useRouter();
    const formFields = getFormFields();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const imageFile = formData.get('image') as File;

        const body = {
            name: formData.get('name') as string,
            image: imageFile ? imageFile.name : null,
        };

        try {
            const response = await axios.post('/api/carousel', body);

            if (response.status === 200) {
                const { imageSignature, imageTimestamp, folder } =
                    response.data;

                if (imageFile) {
                    await uploadImage(
                        imageFile,
                        imageSignature,
                        imageTimestamp,
                        imageFile.name,
                        folder
                    );
                }
            }
        } catch (error: any) {
            console.error('Failed to create carousel', error);
        }
        setShowForm(false);
        router.refresh();
        setIsSubmitting(false);
    }

    return (
        <section id="form">
            <button
                className={utils.btnForm}
                onClick={() => setShowForm(!showForm)}>
                Create Carousel
            </button>

            {isSubmitting ? (
                <Loading />
            ) : (
                <>
                    <FormDialog
                        visible={showForm}
                        onClose={() => setShowForm(false)}>
                        <form
                            className={utils.form}
                            onSubmit={handleSubmit}
                            encType="multipart/form-data">
                            <h1 className={utils.mainHeading}>Carousel Form</h1>
                            {formFields.map(field => (
                                <div key={field.name}>
                                    <label htmlFor={field.name}>
                                        {field.label}
                                    </label>
                                    <input
                                        required
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
                    </FormDialog>
                </>
            )}
        </section>
    );
};
