import nodemailer from 'nodemailer';
import { emailHost, emailPass, emailUser, emailPort } from './config';

export const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort),
    secure: false,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
    tls: {
        ciphers: 'TLSv1.2',
    },
});
