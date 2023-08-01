'use client';
import utils from '~/styles/Utils.module.css';

import axios from 'axios';
import FormDialog from '~/components/client/Dialog';

import { User } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFields } from '../utils/getUserFields';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { DeleteButton } from './DeleteUser';

export const UpdateUser = ({ user }: { user?: User }) => {
    const router = useRouter();
    const formFields = getUserFields(user);
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
        userId: string
    ) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            role: formData.get('role') as string,
        };

        try {
            await axios.put(`/api/register/${userId}`, body);
        } catch (error: any) {
            console.error('Failed to create user', error);
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
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={utils.updateIcon}
                    />
                </button>
                {user && <DeleteButton userId={user?.id} />}
            </div>
            <FormDialog visible={showForm} onClose={() => setShowForm(false)}>
                <form
                    className={utils.form}
                    onSubmit={event => user && handleSubmit(event, user.id)}>
                    <h1 className={utils.mainHeading}>User Form</h1>
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
                    <button className={utils.btnForm} type="submit">
                        Submit
                    </button>
                </form>
            </FormDialog>
        </section>
    );
};
