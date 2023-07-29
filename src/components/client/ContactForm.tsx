'use client';

import axios from 'axios';
import utils from '~/styles/Utils.module.css';
import { useRouter } from 'next/navigation';

const ContactForm = () => {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        await axios.post('/api/contact', body);
        router.refresh();
    }
    return (
        <form onSubmit={handleSubmit} className={utils.contactForm}>
            <label htmlFor="name">Name:</label>
            <input type="text" required={true} placeholder="name" />
            <label htmlFor="email">Email:</label>
            <input type="email" required={true} placeholder="email" />
            <label htmlFor="message">Message:</label>
            <textarea
                name="message"
                placeholder="Enter your message here..."
                cols={30}
                rows={10}
                required={true}></textarea>
            <button className={utils.btnForm} type="submit">
                Submit
            </button>
        </form>
    );
};

export default ContactForm;
