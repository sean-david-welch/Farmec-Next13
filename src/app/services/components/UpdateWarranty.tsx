'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFormFields, getPartFields } from '../utils/getFormFields';

import { WarrantyClaim, PartsRequired } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from './DeleteWarranty';

interface Props {
    warrantyClaim: WarrantyClaim;
    partsRequired: {
        part_number: string | null;
        quantity_needed: string | null;
        invoice_number: string | null;
        description: string | null;
    }[];
}

export const UpdateWarranty = ({ warrantyClaim, partsRequired }: Props) => {
    const router = useRouter();
    const formFields = getFormFields(warrantyClaim);

    const [showForm, setShowForm] = useState(false);
    const [parts, setParts] = useState(partsRequired || []);

    const addPart = () => {
        setParts([
            ...parts,
            {
                part_number: '',
                quantity_needed: '',
                invoice_number: '',
                description: '',
            },
        ]);
    };

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        warrantyId: string
    ) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const partsRequired = parts.map((part, index) => {
            return {
                part_number: event.currentTarget[`part_number_${index}`].value,
                quantity_needed:
                    event.currentTarget[`quantity_needed_${index}`].value,
                invoice_number:
                    event.currentTarget[`invoice_number_${index}`].value,
                description:
                    event.currentTarget[`part_description_${index}`].value,
            };
        });

        const body = {
            warrantyClaim: {
                dealer: formData.get('dealer'),
                dealer_contact: formData.get('dealer_contact'),
                owner_name: formData.get('owner_name'),
                machine_model: formData.get('machine_model'),
                serial_number: formData.get('serial_number'),
                install_date: formData.get('install_date'),
                failure_date: formData.get('failure_date'),
                repair_date: formData.get('repair_date'),
                failure_details: formData.get('failure_details'),
                repair_details: formData.get('repair_details'),
                labour_hours: formData.get('labour_hours'),
                completed_by: formData.get('completed_by'),
            },
            partsRequired: partsRequired,
        };

        try {
            await axios.put(`api/services/warranty/${warrantyId}`, body);
        } catch (error) {
            console.error('Failed to create wwarranty claim', error);
        }
        router.refresh();

        setShowForm(false);
    }

    return (
        <section id="form">
            <div className={utils.optionsBtn}>
                <button
                    className={utils.btnForm}
                    onClick={() => setShowForm(!showForm)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {warrantyClaim && (
                    <DeleteButton warrantyId={warrantyClaim?.id} />
                )}
            </div>
            <FormDialog visible={showForm} onClose={() => setShowForm(false)}>
                <form
                    className={utils.form}
                    onSubmit={event =>
                        warrantyClaim && handleSubmit(event, warrantyClaim.id)
                    }>
                    <h1 className={utils.mainHeading}>Warranty Claim Form</h1>
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
                                defaultValue={field.defaultValue || ''}
                            />
                        </div>
                    ))}
                    {parts.map((part, index) => {
                        const partFields = getPartFields(part, index);
                        return (
                            <div key={index}>
                                {partFields.map(field => (
                                    <div key={field.name}>
                                        <label htmlFor={field.name}>
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            id={field.name}
                                            placeholder={field.placeholder}
                                            defaultValue={
                                                field.defaultValue || ''
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        className={utils.btnForm}
                        onClick={addPart}>
                        Add Part
                    </button>

                    <button className={utils.btnForm} type="submit">
                        Submit
                    </button>
                </form>
            </FormDialog>
        </section>
    );
};
