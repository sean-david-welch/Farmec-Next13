import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';
import { Carousel } from '@prisma/client';
import { CreateCarousel } from './CreateCarousel';
import { UpdateCarousel } from './UpdateCarousel';

interface Props {
    user: { role: string };
}

export const CarouselAdmin = async ({ user }: Props) => {
    const carousels: Carousel[] | null = await prisma.carousel.findMany();

    if (!carousels) {
        return (
            <section id="carousel">
                <h1>No models found</h1>
                {user && user.role === 'ADMIN' && <CreateCarousel />}
            </section>
        );
    }

    return (
        <section id="carousel">
            <h1 className={utils.sectionHeading}>Carousel:</h1>

            {carousels.map(carousel => (
                <div key={carousel.id} className={styles.carouselAdmin}>
                    <h1 className={utils.paragraph}>{carousel.name}</h1>
                    {user && user.role === 'ADMIN' && (
                        <UpdateCarousel carousel={carousel} />
                    )}
                </div>
            ))}
            {user && user.role === 'ADMIN' && <CreateCarousel />}
        </section>
    );
};
