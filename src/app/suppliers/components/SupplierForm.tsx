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

        const response = await axios.post('/api/suppliers', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status >= 200 && response.status <= 300) {
            console.log('response', response);

            const { logo_image, marketing_image } = response.data;

            const logoFile = formData.get('logo_image');
            const marketingFile = formData.get('marketing_image');

            const logoFormData = new FormData();
            const marketingFormData = new FormData();

            if (logoFile instanceof Blob) {
                logoFormData.append('file', logoFile);
            }
            if (marketingFile instanceof Blob) {
                marketingFormData.append('file', marketingFile);
            }

            await axios.post(logo_image, logoFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await axios.post(marketing_image, marketingFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
