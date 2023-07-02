'use client';
import styles from '../styles/Carousel.module.css';
import Image from 'next/image';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export const Carousel = () => {
    const images = [
        '/sulkydx30.jpeg',
        '/sip1250.jpeg',
        '/mx.jpeg',
        '/sulkydx20.jpeg',
        '/mxloader.jpeg',
        '/sipout.jpeg',
    ];

    const [carouselState, setCarouselState] = useState({
        index: 0,
        direction: 0,
    });

    const variants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                opacity: { duration: 0.2 },
            },
        },
        exit: {
            opacity: 0,
            transition: {
                opacity: { duration: 0.2 },
            },
        },
    };

    function nextStep() {
        setCarouselState(prevState => {
            if (prevState.index === images.length - 1) {
                return { index: 0, direction: 1 };
            }
            return { index: prevState.index + 1, direction: 1 };
        });
    }

    function prevStep() {
        setCarouselState(prevState => {
            if (prevState.index === 0) {
                return { index: images.length - 1, direction: -1 };
            }
            return { index: prevState.index - 1, direction: -1 };
        });
    }

    return (
        <div className={styles.slideshow}>
            <AnimatePresence initial={false} custom={carouselState.direction}>
                <motion.div
                    variants={variants}
                    animate="animate"
                    initial="initial"
                    exit="exit"
                    key={images[carouselState.index]}
                    custom={carouselState.direction}>
                    <Image
                        src={images[carouselState.index]}
                        alt="slides"
                        className={styles.slides}
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        quality={100}
                        priority={carouselState.index === 0}
                    />
                </motion.div>
            </AnimatePresence>
            <button className={styles.prevButton} onClick={prevStep}>
                <FontAwesomeIcon icon={faChevronLeft} size={'2x'} />
            </button>
            <button className={styles.nextButton} onClick={nextStep}>
                <FontAwesomeIcon icon={faChevronRight} size={'2x'} />
            </button>
        </div>
    );
};
