'use client';

import axios from 'axios';
import utils from '~/styles/Utils.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

const ContactForm = () => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);

        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            recaptchaResponse: recaptchaValue,
        };

        const response = await axios.post('/api/contact', body);

        if (response.status === 200) {
            formRef.current?.reset();

            router.push('/');
        } else if (response.status === 200 && !response.data.success) {
            alert('There was an error sending your message. Please try again.');
        }
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={utils.contactForm}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" required={true} placeholder="name" />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name="email"
                required={true}
                placeholder="email"
            />
            <label htmlFor="message">Message:</label>
            <textarea
                name="message"
                placeholder="Enter your message here..."
                cols={30}
                rows={5}
                required={true}
            />

            <ReCAPTCHA
                theme="dark"
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string}
                onChange={value => setRecaptchaValue(value)}
            />

            <button className={utils.btnForm} type="submit">
                Submit
            </button>
        </form>
    );
};

export default ContactForm;
