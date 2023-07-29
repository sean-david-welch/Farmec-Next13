import nodemailer from 'nodemailer';
import { emailHost, emailPass, emailUser, emailPort } from './config';
import { Console } from 'console';

export const transporter = nodemailer.createTransport({
    host: emailHost,
    port: Number(emailPort),
    secure: false,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
    tls: {
        ciphers: 'SSLv3',
    },
});
