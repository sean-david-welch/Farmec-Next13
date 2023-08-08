'use client';
import utils from '~/styles/Utils.module.css';

import { CldImage } from 'next-cloudinary';

export const Ftmta = () => {
    return (
        <CldImage
            src="ftmta-logo"
            width="175"
            height="175"
            format="webp"
            className={utils.ftmta}
            alt="Farmec Logo"
        />
    );
};
