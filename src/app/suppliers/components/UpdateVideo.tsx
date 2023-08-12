'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from '~/components/client/DeleteButton';

import { Video } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { getVideoFields } from '../utils/getFormFields';
import { useState, useEffect } from 'react';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

export const UpdateVideo = ({ video }: { video?: Video }) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fields = await getVideoFields(video);
            setFormFields(fields);
        };
        fetchData();
    }, []);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        videoID: string
    ) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            supplier: formData.get('supplier'),
            web_url: formData.get('web_url'),
        };

        try {
            await axios.put(`/api/videos/${videoID}`, body);
        } catch (error) {
            console.error('Failed to create machine', error);
        }
        setShowForm(false);
        router.refresh();
        setIsSubmitting(false);
    }

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
                {video && (
                    <DeleteButton
                        modelId={video?.id}
                        endpoint="suppliers"
                        route="suppliers"
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
                                video && handleSubmit(event, video.id)
                            }
                            className={utils.form}
                            encType="multipart/form-data">
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
