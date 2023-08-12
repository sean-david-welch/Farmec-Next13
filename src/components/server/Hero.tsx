import styles from '../styles/Carousel.module.css';

import dynamic from 'next/dynamic';

import { prisma } from '~/lib/prisma';

import { Carousel } from '../client/Carousel';

export const Hero = async () => {
    const carousel = await prisma.carousel.findMany({
        select: {
            image: true,
        },
    });

    const images = carousel.map(item => item.image) as string[];

    const Typewriter = dynamic(() => import('../client/TypeWriter'));

    return (
        <section id="Hero">
            <div className={styles.heroContainer}>
                <Carousel images={images} />
                <Typewriter />
            </div>
        </section>
    );
};
