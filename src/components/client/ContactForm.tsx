'use client';

import axios from 'axios';
import Script from 'next/script';
import utils from '~/styles/Utils.module.css';

import { useRouter } from 'next/navigation';
import { cloudflareKey } from '~/lib/config';

const ContactForm = () => {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const turnstileResponse = formData.get('cf-turnstile-token') as string;

        if (!turnstileResponse) {
            console.error('No turnstile response');
            return;
        }

        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            token: turnstileResponse,
        };

        const verificationResponse = await axios.post('/api/verify', body);

        console.log(verificationResponse.data);

        if (verificationResponse.data.success) {
            await axios.post('/api/contact', body);
            router.refresh();
        } else {
            console.error('Token verification failed');
        }
    }
    return (
        <>
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
                strategy="lazyOnload"
            />
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

                <div
                    className="cf-turnstile"
                    data-sitekey={cloudflareKey}></div>

                <button className={utils.btnForm} type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default ContactForm;
