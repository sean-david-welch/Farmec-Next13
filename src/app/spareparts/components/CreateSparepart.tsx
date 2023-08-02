'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

import { useRouter } from 'next/navigation';
import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';
import { useState, useEffect } from 'react';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

const SparepartsForm = () => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fields = await getFormFields();
            setFormFields(fields);
        };
        fetchData();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const sparepartFile = formData.get('parts_image') as File;
        const pdfLink = formData.get('pdf_link') as File;

        const body = {
            name: formData.get('name'),
            supplier: formData.get('supplier'),
            parts_image: sparepartFile ? sparepartFile.name : null,
            pdf_link: pdfLink ? pdfLink.name : null,
            spare_parts_link: formData.get('spare_part_link'),
        };

        try {
            const response = await axios.post('/api/spareparts', body);

            if (response.status >= 200 && response.status <= 300) {
                const {
                    sparepartSignature,
                    sparepartTimestamp,
                    pdfSignature,
                    pdfTimestamp,
                    folder,
                } = response.data;

                const sparepartFile = formData.get('parts_image') as File;
                const pdfLink = formData.get('pdf_link') as File;

                if (pdfLink !== null && pdfLink !== undefined) {
                    await uploadImage(
                        pdfLink,
                        pdfSignature,
                        pdfTimestamp,
                        pdfLink.name,
                        folder
                    );
                }

                if (sparepartFile) {
                    await uploadImage(
                        sparepartFile,
                        sparepartSignature,
                        sparepartTimestamp,
                        sparepartFile.name,
                        folder
                    );
                }
            }
        } catch (error) {
            console.error('Failed to create machine', error);
        }
        setShowForm(false);

        router.refresh();
    }

    return (
        <section id="form">
            <button
                className={utils.btnForm}
                onClick={() => setShowForm(!showForm)}>
                Create Spare Part
            </button>
            <FormDialog visible={showForm} onClose={() => setShowForm(false)}>
                <form
                    onSubmit={handleSubmit}
                    className={utils.form}
                    encType="multipart/form-data">
                    <h1 className={utils.mainHeading}>Spare Parts Form</h1>

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
            </FormDialog>
        </section>
    );
};

export default SparepartsForm;
