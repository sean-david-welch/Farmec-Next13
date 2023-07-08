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
        const formData = new FormData(event.currentTarget);

        const response = await axios.post('/api/suppliers', formData);

        if (response.status >= 200 && response.status <= 300) {
            console.log('response', response);
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

            <button className={utils.btnRound} type="submit">
                Submit
            </button>
        </form>
    );
};

export default SupplierForm;
