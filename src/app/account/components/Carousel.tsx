import utils from '~/styles/Utils.module.css';
import styles from '../styles/Account.module.css';

import { prisma } from '~/lib/prisma';
import { Carousel } from '@prisma/client';
import { CreateCarousel } from '~/app/carousel/components/CreateCarousel';
import { UpdateCarousel } from '~/app/carousel/components/UpdateCarousel';

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
            {carousels.map(carousel => (
                <div key={carousel.id}>
                    <h1 className={utils.mainHeading}>{carousel.name}</h1>
                    {user && user.role === 'ADMIN' && (
                        <UpdateCarousel carousel={carousel} />
                    )}
                </div>
            ))}
            {user && user.role === 'ADMIN' && <CreateCarousel />}
        </section>
    );
};
