import nodemailer from 'nodemailer';
import { emailHost, emailPass, emailUser, emailPort } from './config';

export const transporter = nodemailer.createTransport({
    service: 'office365',
    secure: false,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});
