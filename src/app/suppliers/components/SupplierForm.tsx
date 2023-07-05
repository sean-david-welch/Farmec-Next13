'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getFormFields } from '../utils/utils';

const SupplierForm = () => {
    const router = useRouter();
    const formFields = getFormFields();

    const handleFileUpload = async (presignedUrl: string, file: Blob) => {
        if (!(file instanceof File)) {
            throw new Error("Expected 'file' to be a File object.");
        }
        await axios.put(presignedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // assuming logo_image and marketing_image are file fields
        const logoImage = formData.get('logo_image');
        const marketingImage = formData.get('marketing_image');

        if (!(logoImage instanceof Blob) || !(marketingImage instanceof Blob)) {
            throw new Error('Expected file field to contain a file.');
        }

        // get presigned urls
        const logoImagePresigned = await axios.post('/api/suppliers', {
            name: 'logo_image',
        });
        const marketingImagePresigned = await axios.post('/api/suppliers', {
            name: 'marketing_image',
        });

        // upload files
        await handleFileUpload(logoImagePresigned.data.presignedUrl, logoImage);
        await handleFileUpload(
            marketingImagePresigned.data.presignedUrl,
            marketingImage
        );

        // remove file data from form data
        formData.delete('logo_image');
        formData.delete('marketing_image');

        // append s3 urls to the form data
        formData.append('logo_image_url', logoImagePresigned.data.publicUrl);
        formData.append(
            'marketing_image_url',
            marketingImagePresigned.data.publicUrl
        );

        // then post the form data as usual
        const response = await axios.post('/api/suppliers', formData);

        if (response.status >= 200 && response.status <= 300) {
            console.log('response', response);
        } else {
            console.error('Failed to create project', response);
        }

        router.refresh();
    };
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

            <button className={utils.btnRound} type="submit">
                Submit
            </button>
        </form>
    );
};

export default SupplierForm;
