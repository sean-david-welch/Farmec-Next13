'use client';

import axios from 'axios';
import utils from '~/styles/Utils.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

import { useRouter } from 'next/navigation';

const ContactForm = () => {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const recaptchaResponse = await new Promise<string | null>(
            resolve => {}
        );

        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            recaptchaResponse,
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
                required={true}
            />

            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string}
            />

            <button className={utils.btnForm} type="submit">
                Submit
            </button>
        </form>
    );
};

export default ContactForm;
