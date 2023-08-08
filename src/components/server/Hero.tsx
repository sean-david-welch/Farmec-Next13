import styles from '../styles/Carousel.module.css';

import Typewriter from '../client/TypeWriter';

import { prisma } from '~/lib/prisma';
import { Carousel } from '~/components/client/Carousel';

export const Hero = async () => {
    const carousel = await prisma.carousel.findMany({});

    const images = carousel
        .map(item => item.name)
        .filter(name => name !== null) as string[];

    return (
        <section id="Hero">
            <div className={styles.heroContainer}>
                <Carousel images={images} />
                <Typewriter />
            </div>
        </section>
    );
};
