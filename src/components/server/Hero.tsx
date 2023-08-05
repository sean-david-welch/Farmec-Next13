import utils from '~/styles/Utils.module.css';
import styles from '../styles/Header.module.css';

import Image from 'next/image';
import Typewriter from '../client/TypeWriter';

import { prisma } from '~/lib/prisma';
import { Carousel } from '~/components/client/Carousel';

export const Hero = async () => {
    const carousel = await prisma.carousel.findMany({
        select: {
            image: true,
        },
    });

    const images = carousel
        .map(item => item.image)
        .filter(image => image !== null);

    return (
        <section id="Hero">
            <div className={utils.heroContainer}>
                <Carousel>
                    {images.map((src, index) => (
                        <Image
                            key={index}
                            src={src as string}
                            alt={`Carousel Slide ${index}`}
                            className={styles.slides}
                            fill={true}
                            quality={100}
                            priority={index === 0}
                        />
                    ))}
                </Carousel>
                <Typewriter />
            </div>
        </section>
    );
};
