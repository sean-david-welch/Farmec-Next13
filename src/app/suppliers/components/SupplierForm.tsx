'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getFormFields } from '../utils/utils';

const SupplierForm = () => {
    const router = useRouter();
    const formFields = getFormFields();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        formFields.forEach(field => {
            const value = formData.get(field.name);
            if (field.type === 'file' && value instanceof File) {
                formData.append(field.name, value, value.name);
                formData.append(`${field.name}_name`, value.name);
                formData.append(`${field.name}_type`, value.type);
            }
        });

        const response = await axios.post('/api/suppliers', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status >= 200 && response.status <= 300) {
            console.log('response', response);
        } else {
            console.error('Failed to create project', response);
        }

        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default SupplierForm;
