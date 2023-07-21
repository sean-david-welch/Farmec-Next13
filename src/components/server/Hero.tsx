import utils from '~/styles/Utils.module.css';
import dynamic from 'next/dynamic';

import { prisma } from '~/lib/prisma';
import { Carousel } from '~/components/client/Carousel';

const Typewriter = dynamic(() => import('../client/TypeWriter'));

export const Hero = async () => {
    const data = await prisma.carousel.findMany();
    const images = data
        .map(item => item.image)
        .filter(image => image !== null) as string[];

    return (
        <section id="Hero">
            <div className={utils.heroContainer}>
                <Carousel images={images} />
                <Typewriter />
            </div>
        </section>
    );
};
