'use client';
import styles from '../styles/About.module.css';
import utils from '~/styles/Utils.module.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';

import { getFormFields } from '../utils/GetFormFields';
import {
    getEmployeeFormData,
    getTimelineFormData,
    getTermFormData,
    getPrivacyFormData,
} from '../utils/getFormData';
import axios from 'axios';

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

    const [showForm, setShowForm] = useState(false);

    const getFormDataFunctions = {
        employee: getEmployeeFormData,
        timeline: getTimelineFormData,
        terms: getTermFormData,
        privacy: getPrivacyFormData,
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const file = formData.get(`${modelName}_image`) as File;
        const getFormDataFunction = getFormDataFunctions[modelName];

        const body = getFormDataFunction
            ? {
                  ...getFormDataFunction(formData),
                  [`${modelName}_image`]: file ? file.name : null,
              }
            : {};

        try {
            const response = await axios.post(`/api/about`, body);

            if (modelName === 'employee' && response.status >= 200) {
                const { signature, timestamp, folder } = response.data;

                if (file) {
                    await uploadImage(
                        file,
                        signature,
                        timestamp,
                        file.name,
                        folder
                    );
                }
            }
        } catch (error) {
            console.error('failed to create model', error);
        }
        setShowForm(false);
        router.refresh();
    };

    const buttonTexts = {
        employee: 'Add Employee',
        timeline: 'Add Timeline',
        terms: 'Add Terms',
        privacy: 'Add Privacy',
    };

    return (
        <section id={styles.form}>
            <button
                className={utils.btnForm}
                onClick={() => setShowForm(!showForm)}>
                {buttonTexts[modelName] || 'Add'}
            </button>
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
