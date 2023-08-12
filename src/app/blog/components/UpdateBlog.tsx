'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';
import { useState, useEffect } from 'react';

import { getFormFields } from '../utils/getFormFields';
import { Blog, Exhibition } from '@prisma/client';
import { getBlogFormData, getExhibitionFormData } from '../utils/getFormData';

import { DeleteButton } from '~/components/client/DeleteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
    model: Blog | Exhibition;
}

export const UpdateBlog = ({ modelName, model }: Props) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchFields = async () => {
            const fields = await getFormFields(modelName, model);
            setFormFields(fields);
        };

        fetchFields();
    }, [modelName]);

    const getFormDataFunctions = {
        blog: getBlogFormData,
        exhibition: getExhibitionFormData,
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        modelId: string
    ) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        const getFormDataFunction = getFormDataFunctions[modelName];

        if (modelName === 'blog') {
            const BlogFile = formData.get(`main_image`) as File;

            const body = {
                model: modelName,
                data: {
                    ...getFormDataFunction(formData),
                    ['main_image']: BlogFile ? BlogFile.name : null,
                },
            };
            try {
                const response = await axios.put(`/api/blog/${modelId}`, body);

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
        } else if (modelName === 'exhibition') {
            const body = {
                model: modelName,
                data: getFormDataFunction(formData),
            };

            try {
                await axios.put(`/api/blog/${modelId}`, body);
            } catch (error) {
                console.error('failed to create model', error);
            }
        }
        setShowForm(false);
        setIsSubmitting(false);
        router.refresh();
    };

    const buttonTexts = {
        blog: 'Add Blog',
        exhibition: 'Add Exhibition',
    };

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={utils.updateIcon}
                    />
                </button>
                {model && (
                    <DeleteButton
                        modelId={model?.id}
                        modelName={modelName}
                        route="blog"
                        endpoint="blog"
                    />
                )}
            </div>

            {isSubmitting ? (
                <Loading />
            ) : (
                <>
                    <FormDialog
                        visible={showForm}
                        onClose={() => setShowForm(false)}>
                        <form
                            onSubmit={event =>
                                model && handleSubmit(event, model.id)
                            }
                            className={utils.form}
                            encType="multipart/form-data">
                            <h1 className={utils.mainHeading}>
                                {buttonTexts[modelName] || 'Add Blog'}
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
                                            defaultValue={
                                                field.defaultValue || ''
                                            }>
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
