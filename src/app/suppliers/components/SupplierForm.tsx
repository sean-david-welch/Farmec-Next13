'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { uploadImage } from '../utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';

const SupplierForm = () => {
    const router = useRouter();
    const formFields = getFormFields();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            name: formData.get('name'),
            description: formData.get('description'),
            logo_image: formData.get('logo_image'),
            marketing_image: formData.get('marketing_image'),
            social_facebook: formData.get('social_facebook'),
            social_twitter: formData.get('social_twitter'),
            social_instagram: formData.get('social_instagram'),
            social_youtube: formData.get('social_youtube'),
            social_linkedin: formData.get('social_linkedin'),
            social_website: formData.get('social_website'),
        };

        try {
            const response = await axios.post('/api/suppliers', body);
            console.log(response.data);

            if (response.status >= 200 && response.status <= 300) {
                console.log(response.data);
                const { logoSignature, marketingSignature, timestamp } =
                    response.data;

                const logoFile = formData.get('logo_image');
                const marketingFile = formData.get('marketing_image');

                if (logoFile instanceof Blob) {
                    await uploadImage(logoFile, logoSignature, timestamp);
                }
                if (marketingFile instanceof Blob) {
                    await uploadImage(
                        marketingFile,
                        marketingSignature,
                        timestamp
                    );
                }

                router.refresh();
            }
        } catch (error) {
            console.error('Failed to create supplier', error);
        }
    }

    return (
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
                    />
                </div>
            ))}

            <button className={utils.btnForm} type="submit">
                Submit
            </button>
        </form>
    );
};

export default SupplierForm;
