'use client';
import styles from '../styles/About.module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getFormFields } from '../utils/GetFormFields';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

interface Props {
    modelName: 'employee' | 'timeline' | 'terms' | 'privacy';
}

export const AboutForm = ({ modelName }: Props) => {
    const router = useRouter();
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchFields = async () => {
            const fields = await getFormFields(modelName);
            setFormFields(fields);
        };

        fetchFields();
    }, [modelName]);

    const [showForm, setshowForm] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setshowForm(false);
        router.refresh();
    };

    return (
        <section id={styles.form}>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
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
                    <button className={styles.btn} type="submit">
                        Submit
                    </button>
                </form>
            )}
        </section>
    );
};
