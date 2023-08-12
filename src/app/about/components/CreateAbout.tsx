'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

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
import Loading from '../loading';

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
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchFields = async () => {
            const fields = await getFormFields(modelName);
            setFormFields(fields);
        };

        fetchFields();
    }, [modelName]);

    const getFormDataFunctions = {
        employee: getEmployeeFormData,
        timeline: getTimelineFormData,
        terms: getTermFormData,
        privacy: getPrivacyFormData,
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

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

                if (EmployeeFile && profileSignature && profileTimestamp) {
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
                await axios.post(`/api/about`, body);
            } catch (error) {
                console.error('failed to create model', error);
            }
        }
        setShowForm(false);
        setIsSubmitting(false);
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
            {isSubmitting ? (
                <Loading />
            ) : (
                <>
                    <button
                        className={utils.btnForm}
                        onClick={() => setShowForm(!showForm)}>
                        {buttonTexts[modelName] || 'Add'}
                    </button>
                    <FormDialog
                        visible={showForm}
                        onClose={() => setShowForm(false)}>
                        <form
                            onSubmit={handleSubmit}
                            className={utils.form}
                            encType="multipart/form-data">
                            <h1 className={utils.mainHeading}>
                                {buttonTexts[modelName] || 'Add'}
                            </h1>
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
