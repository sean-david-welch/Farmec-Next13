'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

import { Supplier } from '@prisma/client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { uploadImage } from '../../../utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from './DeleteSupplier';

export const SupplierForm = ({ supplier }: { supplier?: Supplier }) => {
    const router = useRouter();
    const formFields = getFormFields(supplier);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        supplierID: string
    ) => {
        event.preventDefault();
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
            const response = await axios.put(
                `/api/suppliers/${supplierID}`,
                body
            );

            if (response.status >= 200 && response.status <= 300) {
                const {
                    logoSignature,
                    logoTimestamp,
                    marketingSignature,
                    marketingTimestamp,
                    folder,
                } = response.data;

                const logoFile = formData.get('logo_image') as File;
                const marketingFile = formData.get('marketing_image') as File;

                if (logoFile) {
                    await uploadImage(
                        logoFile,
                        logoSignature,
                        logoTimestamp,
                        logoFile.name,
                        folder
                    );
                }
                if (marketingFile) {
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
    };

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {supplier && <DeleteButton SupplierId={supplier?.id} />}
            </div>
            <FormDialog visible={showForm} onClose={() => setShowForm(false)}>
                <form
                    className={utils.form}
                    onSubmit={event =>
                        supplier && handleSubmit(event, supplier.id)
                    }
                    encType="multipart/form-data">
                    <h1 className={utils.mainHeading}>Supplier Form</h1>

                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                defaultValue={field.defaultValue || ''}
                            />
                        </div>
                    ))}
                    <button className={utils.btnForm} type="submit">
                        Submit
                    </button>
                </form>
            </FormDialog>
        </section>
    );
};
