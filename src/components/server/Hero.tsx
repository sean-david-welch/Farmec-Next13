import utils from '~/styles/Utils.module.css';
import dynamic from 'next/dynamic';

import { Carousel } from '~/components/client/Carousel';

const Typewriter = dynamic(() => import('../client/TypeWriter'));

export const Hero = () => {
    return (
        <section id="Hero">
            <div className={utils.heroContainer}>
                <Carousel />
                <Typewriter />
            </div>
        </section>
    );
};
