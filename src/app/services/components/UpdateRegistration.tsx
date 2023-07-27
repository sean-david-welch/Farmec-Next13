'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRegFields } from '../utils/getFormFields';
import { MachineRegistration } from '@prisma/client';

import { DeleteButton } from './DeleteRegistration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const UpdateRegistration = ({
    registration,
}: {
    registration: MachineRegistration;
}) => {
    const router = useRouter();
    const formFields = getRegFields(registration);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            dealer_name: formData.get('dealer_name') as string,
            dealer_address: formData.get('dealer_address') as string,
            owner_name: formData.get('owner_name') as string,
            owner_address: formData.get('owner_address') as string,
            machine_model: formData.get('machine_model') as string,
            serial_number: formData.get('serial_number') as string,
            install_date: formData.get('install_date') as string,
            invoice_number: formData.get('invoice_number') as string,
            complete_supply: formData.get('complete_supply') === 'on',
            pdi_complete: formData.get('pdi_complete') === 'on',
            pto_correct: formData.get('pto_correct') === 'on',
            machine_test_run: formData.get('machine_test_run') === 'on',
            safety_induction: formData.get('safety_induction') === 'on',
            operator_handbook: formData.get('operator_handbook') === 'on',
            date: formData.get('date') as string,
            completed_by: formData.get('completed_by') as string,
        };

        try {
            const response = await axios.post('/api/registration', body);
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
                {registration && (
                    <DeleteButton registrationId={registration?.id} />
                )}
            </div>
            {showForm && (
                <form className={utils.form} onSubmit={handleSubmit}>
                    {formFields.map(field => (
                        <div key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {field.type === 'select' ? (
                                <select
                                    name={field.name}
                                    id={field.name}
                                    defaultValue={field.defaultValue || ''}>
                                    {field.options &&
                                        field.options.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    defaultValue={field.defaultValue || ''}
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
