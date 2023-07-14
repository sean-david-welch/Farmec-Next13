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

        const getFormDataFunction = getFormDataFunctions[modelName];

        if (modelName === 'employee') {
            const EmployeeFile = formData.get(`profile_image`) as File;

            const body = getFormDataFunction
                ? {
                      model: modelName,
                      data: {
                          ...getFormDataFunction(formData),
                          ['profile_image']: EmployeeFile
                              ? EmployeeFile.name
                              : null,
                      },
                  }
                : {};

            const response = await axios.post(`/api/about`, body);

            if (response.status === 200) {
                const { profileSignature, profileTimestamp, folder } =
                    response.data;

                if (EmployeeFile) {
                    await uploadImage(
                        EmployeeFile,
                        profileSignature,
                        profileTimestamp,
                        EmployeeFile.name,
                        folder
                    );
                }
            }
        } else {
            const body = getFormDataFunction
                ? {
                      model: modelName,
                      data: getFormDataFunction(formData),
                  }
                : {};

            try {
                const response = await axios.post(`/api/about`, body);
                console.log('response', response);
            } catch (error) {
                console.error('failed to create model', error);
            }
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
        <section id="form">
            <button
                className={utils.btnForm}
                onClick={() => setShowForm(!showForm)}>
                {buttonTexts[modelName] || 'Add'}
            </button>
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className={utils.form}
                    encType="multipart/form-data">
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
                    <button className={utils.btnForm} type="submit">
                        Submit
                    </button>
                </form>
            )}
        </section>
    );
};
