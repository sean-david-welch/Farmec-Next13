import { Carousel } from '~/components/client/Carousel';

import dynamic from 'next/dynamic';

const Typewriter = dynamic(() => import('../client/TypeWriter'));

export const Hero = () => {
    return (
        <section id="Hero">
            <Carousel />

            <Typewriter />
        </section>
    );
};
