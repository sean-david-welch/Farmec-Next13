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

        const response = await axios.post('/api/suppliers', formData, {});

        console.log(response);
        console.log(response.data);

        if (response.status >= 200 && response.status <= 300) {
            const { logoSignature, marketingSignature, timestamp } =
                response.data;

            const logoFile = formData.get('logo_image');
            const marketingFile = formData.get('marketing_image');

            console.log(typeof logoFile);

            if (logoFile instanceof Blob) {
                await uploadImage(logoFile, logoSignature, timestamp);
            }
            if (marketingFile instanceof Blob) {
                await uploadImage(marketingFile, marketingSignature, timestamp);
            }
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
