'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';

const SupplierForm = () => {
    const router = useRouter();
    const formFields = getFormFields();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const logoFile = formData.get('logo_image') as File;
        const marketingFile = formData.get('marketing_image') as File;

        const body = {
            name: formData.get('name'),
            description: formData.get('description'),
            logo_image: logoFile ? logoFile.name : null,
            marketing_image: marketingFile ? marketingFile.name : null,
            social_facebook: formData.get('social_facebook'),
            social_twitter: formData.get('social_twitter'),
            social_instagram: formData.get('social_instagram'),
            social_youtube: formData.get('social_youtube'),
            social_linkedin: formData.get('social_linkedin'),
            social_website: formData.get('social_website'),
        };

        try {
            const response = await axios.post('/api/suppliers', body);

            if (response.status >= 200 && response.status <= 300) {
                const {
                    logoSignature,
                    logoTimestamp,
                    marketingSignature,
                    marketingTimestamp,
                    folder,
                } = response.data;

                if (logoFile && logoSignature && logoTimestamp) {
                    await uploadImage(
                        logoFile,
                        logoSignature,
                        logoTimestamp,
                        logoFile.name,
                        folder
                    );
                }
                if (marketingFile && marketingSignature && marketingTimestamp) {
                    await uploadImage(
                        marketingFile,
                        marketingSignature,
                        marketingTimestamp,
                        marketingFile.name,
                        folder
                    );
                }
            }
        } catch (error) {
            console.error('Failed to create supplier', error);
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
                Create Supplier
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
                            <h1 className={utils.mainHeading}>Supplier Form</h1>
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

export default SupplierForm;
