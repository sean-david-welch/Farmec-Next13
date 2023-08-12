'use client';
import utils from '~/styles/Utils.module.css';
import axios from 'axios';

import Loading from '~/app/loading';
import FormDialog from '~/components/client/Dialog';

import { Machine } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { uploadImage } from '~/utils/uploadImage';
import { getFormFields } from '../utils/getFormFields';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from '~/components/client/DeleteButton';

interface FormField {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    defaultValue?: string | null;
    options?: { label: string | null; value: string }[];
}

const UpdateMachine = ({ machine }: { machine?: Machine }) => {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formFields, setFormFields] = useState<FormField[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const fields = await getFormFields(machine);
            setFormFields(fields);
        };
        fetchData();
    }, []);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        machineID: string
    ) {
        event.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const machineFile = formData.get('machine_image') as File;

        const body = {
            name: formData.get('name'),
            supplier: formData.get('supplier'),
            machine_image: machineFile ? machineFile.name : null,
            description: formData.get('description'),
            machine_link: formData.get('machine_link'),
        };

        try {
            const response = await axios.put(
                `/api/machines/${machineID}`,
                body
            );

            if (response.status >= 200 && response.status <= 300) {
                const { machineSignature, machineTimestamp, folder } =
                    response.data;

                if (machineFile && machineSignature && machineTimestamp) {
                    await uploadImage(
                        machineFile,
                        machineSignature,
                        machineTimestamp,
                        machineFile.name,
                        folder
                    );
                }
            }
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
                {machine && (
                    <DeleteButton
                        modelId={machine?.id}
                        route="machines"
                        endpoint={`suppliers/${machine.supplierId}`}
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
                                machine && handleSubmit(event, machine.id)
                            }
                            className={utils.form}
                            encType="multipart/form-data">
                            <h1 className={utils.mainHeading}>Machine Form</h1>
                            {formFields.map(field => (
                                <div key={field.name}>
                                    <label htmlFor={field.name}>
                                        {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            name={field.name}
                                            id={field.name}
                                            placeholder={field.placeholder}
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
                                                field.defaultValue || ''
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

export default UpdateMachine;
