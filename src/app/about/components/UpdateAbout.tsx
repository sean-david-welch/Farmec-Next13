'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { DeleteButton } from './DeleteAbout';
import { useState, useEffect } from 'react';
import { Employee, Timeline, Terms, Privacy } from '@prisma/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/GetFormFields';
import {
    getEmployeeFormData,
    getTimelineFormData,
    getTermFormData,
    getPrivacyFormData,
} from '../utils/getFormData';

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
    model: Employee | Timeline | Terms | Privacy;
}

export const UpdateAbout = ({ modelName, model }: Props) => {
    const router = useRouter();
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchFields = async () => {
            const fields = await getFormFields(modelName, model);
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

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        modelId: string
    ) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const getFormDataFunction = getFormDataFunctions[modelName];

        if (modelName === 'employee') {
            const EmployeeFile = formData.get(`profile_image`) as File;

            const body = getFormDataFunction
                ? {
                      model: modelName,
                      modelId: modelId,
                      data: {
                          ...getFormDataFunction(formData),
                          ['profile_image']: EmployeeFile
                              ? EmployeeFile.name
                              : null,
                      },
                  }
                : {};

            const response = await axios.put(`/api/about/${modelId}`, body);

            if (response.status === 200) {
                const { profileSignature, profileTimestamp, folder } =
                    response.data;

                console.log('response', response);

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
                      modelId: modelId,
                      data: getFormDataFunction(formData),
                  }
                : {};

            try {
                const response = await axios.put(`/api/about/${modelId}`, body);
                console.log('response', response);
            } catch (error) {
                console.error('failed to create model', error);
            }
        }
        setShowForm(false);
        router.refresh();
    };

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {model && <DeleteButton modelId={model?.id} />}
            </div>
            {showForm && (
                <form
                    onSubmit={event => model && handleSubmit(event, model.id)}
                    className={utils.formSmall}
                    encType="multipart/form-data">
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    id={field.name}
                                    defaultValue={field.defaultValue || ''}>
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
                                    defaultValue={
                                        field.type === 'file'
                                            ? undefined
                                            : field.defaultValue || ''
                                    }
                                />
                            )}
                        </div>
                    ))}
                    <button
                        className={utils.btnForm}
                        type="submit"
                        disabled={!model}>
                        Submit
                    </button>
                </form>
            )}
        </section>
    );
};
