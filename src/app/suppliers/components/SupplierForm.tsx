'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getFormFields } from '../utils/utils';

const SupplierForm = () => {
    const router = useRouter();
    const formFields = getFormFields();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const logoFormData = new FormData();
        const marketingFormData = new FormData();

        console.log('formData', formData);

        const body = {
            name: formData.get('name') as string,
            logo_image: formData.get('logo_image') as Blob,
            marketing_image: formData.get('marketing_image') as Blob,
            description: formData.get('description') as string,
            social_facebook: formData.get('social_facebook') as string,
            social_instagram: formData.get('social_instagram') as string,
            social_twitter: formData.get('social_twitter') as string,
            social_linkedin: formData.get('social_linkedin') as string,
            social_youtube: formData.get('social_youtube') as string,
            social_website: formData.get('social_website') as string,
        };

        const response = await axios.post('/api/suppliers', body);

        if (response.status >= 200 && response.status <= 300) {
            console.log('response', response);

            const { logo_image, marketing_image } = response.data;

            const logoFile = formData.get('logo_image');
            const marketingFile = formData.get('marketing_image');

            if (logoFile instanceof Blob) {
                logoFormData.append('file', logoFile);
            }
            if (marketingFile instanceof Blob) {
                marketingFormData.append('file', marketingFile);
            }

            await axios.post(logo_image, logoFormData);
            await axios.post(marketing_image, marketingFormData);
        } else {
            console.error('Failed to create project', response);
        }
        router.refresh();
    }

    return (
        <form className={utils.form} onSubmit={handleSubmit}>
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
