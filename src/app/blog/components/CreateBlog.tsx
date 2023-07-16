'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';

import { getFormFields } from '../utils/getFormFields';
import { getBlogFormData, getExhibitionFormData } from '../utils/getFormData';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

interface Props {
    modelName: 'blog' | 'exhibition';
}

export const BlogForm = ({ modelName }: Props) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchFields = async () => {
            const fields = await getFormFields(modelName);
            setFormFields(fields);
        };

        fetchFields();
    }, [modelName]);

    const getFormDataFunctions = {
        blog: getBlogFormData,
        exhibition: getExhibitionFormData,
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const getFormDataFunction = getFormDataFunctions[modelName];

        if (modelName === 'blog') {
            const BlogFile = formData.get(`main_image`) as File;

            const body = {
                model: modelName,
                data: {
                    ...getFormDataFunction(formData),
                    ['main_image']: BlogFile,
                },
            };
            try {
                const response = await axios.post('/api/blog', body);

                if (response.status === 200) {
                    const { blogSignature, blogTimestamp, folder } =
                        response.data;

                    if (BlogFile) {
                        await uploadImage(
                            BlogFile,
                            blogSignature,
                            blogTimestamp,
                            BlogFile.name,
                            folder
                        );
                    }
                }
            } catch (error) {
                console.error('failed to create model', error);
            }
        } else {
            const body = {
                model: modelName,
                data: getFormDataFunction(formData),
            };

            try {
                await axios.post('/api/blog', body);
            } catch (error) {
                console.error('failed to create model', error);
            }
        }
        setShowForm(false);
        router.refresh();
    };

    const buttonTexts = {
        blog: 'Add Blog',
        exhibition: 'Add Exhibition',
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
