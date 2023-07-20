import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';
import { Carousel } from '@prisma/client';
import { CreateCarousel } from '~/app/carousel/components/CreateCarousel';

export const CarouselAdmin = async () => {
    const carousels: Carousel[] | null = await prisma.carousel.findMany();

    if (!carousels) {
        return (
            <section id="carousel">
                <h1>No models found</h1>
                <CreateCarousel />
            </section>
        );
    }

    return (
        <section id="carousel">
            {carousels.map(({ id, name }) => (
                <div key={id}>
                    <h1 className={utils.mainHeading}>{name}</h1>
                </div>
            ))}
        </section>
    );
};
