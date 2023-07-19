'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFormFields, getPartFields } from '../urils/getFormFields';

export const CreateWarranty = () => {
    const router = useRouter();
    const formFields = getFormFields();
    const [showForm, setShowForm] = useState(false);
    const [parts, setParts] = useState([
        {
            part_number: '',
            quantity_needed: '',
            invoice_number: '',
            description: '',
        },
    ]);
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

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const partsRequired = parts.map(index => {
            console.log(event.currentTarget);
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

        console.log(partsRequired);
        console.log(formData);

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

        console.log(body);

        try {
            const response = await axios.post('/api/warranty', body);
            console.log(response);
        } catch (error) {
            console.error('Failed to create wwarranty claim', error);
        }
        router.refresh();
        setShowForm(false);
    }

    return (
        <section id="form">
            <button
                className={utils.btnForm}
                onClick={() => setShowForm(!showForm)}>
                Create Warranty Claim
            </button>
            {showForm && (
                <form className={utils.form} onSubmit={handleSubmit}>
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                name={field.name}
                                id={field.name}
                                placeholder={field.placeholder}
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
            )}
        </section>
    );
};
