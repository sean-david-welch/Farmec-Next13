'use client';
import utils from '~/styles/Utils.module.css';

import { CldImage } from 'next-cloudinary';

export const Logo = () => {
    return (
        <CldImage
            src="farmeclogo"
            width="256"
            height="63"
            crop="scale"
            sizes="100vw"
            format="webp"
            className={utils.logo}
            alt="Farmec Logo"
        />
    );
};
