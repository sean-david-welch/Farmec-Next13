'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getVideoFields } from '../utils/getFormFields';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

export const CreateVideo = () => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fields = await getVideoFields();
            setFormFields(fields);
        };
        fetchData();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            supplier: formData.get('supplier'),
            web_url: formData.get('web_url'),
        };

        try {
            await axios.post('/api/videos', body);
        } catch (error) {
            console.error('Failed to create machine', error);
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
                Create Video
            </button>

            {isSubmitting ? (
                <Loading />
            ) : (
                <>
                    <FormDialog
                        visible={showForm}
                        onClose={() => setShowForm(false)}>
                        <form onSubmit={handleSubmit} className={utils.form}>
                            <h1 className={utils.mainHeading}>Video Form</h1>

                            {formFields.map(field => (
                                <div key={field.name}>
                                    <label htmlFor={field.name}>
                                        {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            id={field.name}
                                            placeholder={field.placeholder}>
                                            {field.options?.map(option => (
                                                <option
                                                    key={option.value}
                                                    value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            id={field.name}
                                            placeholder={field.placeholder}
                                        />
                                    )}
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
