'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

import { useRouter } from 'next/navigation';
import { SpareParts } from '@prisma/client';
import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from './DeleteSparepart';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

const UpdatePartForm = ({ sparepart }: { sparepart?: SpareParts }) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fields = await getFormFields(sparepart);
            setFormFields(fields);
        };
        fetchData();
    }, []);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        sparepartID: string
    ) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const sparepartFile = formData.get('parts_image') as File;

        const body = {
            name: formData.get('name'),
            supplier: formData.get('supplier'),
            sparepart_image: sparepartFile ? sparepartFile.name : null,
            description: formData.get('description'),
            sparepart_link: formData.get('spare_part_link'),
        };

        try {
            const response = await axios.post(
                `/api/spareparts/${sparepartID}`,
                body
            );

            if (response.status >= 200 && response.status <= 300) {
                const { sparepartSignature, sparepartTimestamp, folder } =
                    response.data;

                const sparepartFile = formData.get('parts_image') as File;

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
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    {sparepart && <DeleteButton sparepartID={sparepart?.id} />}
                </button>
            </div>
            <FormDialog visible={showForm} onClose={() => setShowForm(false)}>
                <form
                    onSubmit={event =>
                        sparepart && handleSubmit(event, sparepart.id)
                    }
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

export default UpdatePartForm;
